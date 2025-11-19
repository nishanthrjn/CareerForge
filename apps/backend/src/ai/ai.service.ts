// apps/backend/src/ai/ai.service.ts
import { Inject, Injectable } from '@nestjs/common';
import {
  ILLMProvider,
  GenerateSectionParams,
} from './llm-provider.interface';

@Injectable()
export class AiService {
  constructor(
    @Inject('LLM_PROVIDER') private readonly provider: ILLMProvider,
  ) {}

  getProviderName(): string {
    return this.provider.name;
  }

  async generateSection(params: GenerateSectionParams): Promise<string> {
    return this.provider.generateSection(params);
  }
}
