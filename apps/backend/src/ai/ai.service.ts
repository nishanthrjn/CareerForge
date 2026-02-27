// apps/backend/src/ai/ai.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { GenerateSectionParams } from './llm-provider.interface';
import { ProviderFactory } from './provider.factory';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(private readonly providerFactory: ProviderFactory) { }

  async generateSection(params: GenerateSectionParams): Promise<{ content: string; providerUsed: string }> {
    const providers = this.providerFactory.getProviders();
    let lastError: Error | null = null;

    if (providers.length === 0) {
      throw new Error('No AI providers configured.');
    }

    for (const provider of providers) {
      try {
        const content = await provider.generateSection(params);
        return { content, providerUsed: provider.name };
      } catch (error: any) {
        this.logger.warn(`Provider ${provider.name} failed: ${error.message}. Switching to next...`);
        lastError = error;
        // Continue to fallback
      }
    }
    throw new Error('All AI providers exceeded limit or failed: ' + lastError?.message);
  }

  async generateText(prompt: string): Promise<{ content: string; providerUsed: string }> {
    const providers = this.providerFactory.getProviders();
    let lastError: Error | null = null;

    if (providers.length === 0) {
      throw new Error('No AI providers configured.');
    }

    for (const provider of providers) {
      try {
        const content = await provider.generateText(prompt);
        return { content, providerUsed: provider.name };
      } catch (error: any) {
        this.logger.warn(`Provider ${provider.name} failed: ${error.message}. Switching to next...`);
        lastError = error;
      }
    }
    throw new Error('All AI providers exceeded limit or failed: ' + lastError?.message);
  }
}
