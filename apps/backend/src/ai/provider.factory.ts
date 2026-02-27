import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ILLMProvider } from './llm-provider.interface';
import { OpenAiProvider } from './providers/openai.provider';
import { GeminiProvider } from './providers/gemini.provider';
import { DeepSeekProvider } from './providers/deepseek.provider';

@Injectable()
export class ProviderFactory {
    private providers: ILLMProvider[] = [];

    constructor(private readonly config: ConfigService) { }

    async initialize() {
        const primary = this.config.get<string>('llmProvider') || 'deepseek';

        // Lazy load the clients
        const OpenAI = (await import('openai')).default;
        const { GoogleGenerativeAI } = await import('@google/generative-ai');

        const openaiApiKey = this.config.get<string>('openaiApiKey');
        const geminiApiKey = this.config.get<string>('geminiApiKey');
        const deepseekApiKey = this.config.get<string>('deepseekApiKey');

        const available: ILLMProvider[] = [];

        if (deepseekApiKey) {
            const client = new OpenAI({ apiKey: deepseekApiKey, baseURL: 'https://api.deepseek.com/v1' });
            available.push(new DeepSeekProvider(client));
        }
        if (openaiApiKey) {
            const client = new OpenAI({ apiKey: openaiApiKey });
            available.push(new OpenAiProvider(client));
        }
        if (geminiApiKey) {
            const client = new GoogleGenerativeAI(geminiApiKey);
            available.push(new GeminiProvider(client));
        }

        // Sort to put the primary first for fallback chain
        this.providers = available.sort((a, b) => a.name === primary ? -1 : (b.name === primary ? 1 : 0));
        if (this.providers.length === 0) {
            console.warn('WARN: No LLM providers configured. Please set at least one AI API key.');
        }
    }

    getProviders(): ILLMProvider[] {
        return this.providers;
    }
}
