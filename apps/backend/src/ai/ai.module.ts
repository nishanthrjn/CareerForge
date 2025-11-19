// apps/backend/src/ai/ai.module.ts
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiService } from './ai.service';

@Module({
  providers: [
    AiService,
    {
      provide: 'LLM_PROVIDER',
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const providerName = config.get<string>('llmProvider');
        if (providerName === 'gemini') {
          const { GoogleGenerativeAI } = await import('@google/generative-ai');
          const client = new GoogleGenerativeAI(
            config.get<string>('geminiApiKey')!,
          );
          const { GeminiProvider } = await import('./providers/gemini.provider');
          return new GeminiProvider(client);
        }
        // default: openai
        const OpenAI = (await import('openai')).default;
        const client = new OpenAI({
          apiKey: config.get<string>('openaiApiKey')!,
        });
        const { OpenAiProvider } = await import('./providers/openai.provider');
        return new OpenAiProvider(client);
      },
    },
  ],
  exports: [AiService],
})
export class AiModule {}
