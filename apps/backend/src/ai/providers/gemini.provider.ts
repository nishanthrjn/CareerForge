// apps/backend/src/ai/providers/gemini.provider.ts
import { ILLMProvider, GenerateSectionParams } from '../llm-provider.interface';
import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiProvider implements ILLMProvider {
  name = 'gemini';

  constructor(private readonly client: GoogleGenerativeAI) {}

  async generateSection(params: GenerateSectionParams): Promise<string> {
    const prompt = this.buildPrompt(params);
    const model = this.client.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text ?? '';
  }

  private buildPrompt(params: GenerateSectionParams): string {
    // similar content as OpenAiProvider
    return `...`; // shortened for brevity, same logic as above
  }
}
