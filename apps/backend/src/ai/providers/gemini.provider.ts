// apps/backend/src/ai/providers/gemini.provider.ts
import { ILLMProvider, GenerateSectionParams } from '../llm-provider.interface';
import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiProvider implements ILLMProvider {
  name = 'gemini';

  constructor(private readonly client: GoogleGenerativeAI) { }

  async generateSection(params: GenerateSectionParams): Promise<string> {
    const prompt = this.buildPrompt(params);
    const model = this.client.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text ?? '';
  }

  async generateText(prompt: string): Promise<string> {
    const model = this.client.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text ?? '';
  }

  private buildPrompt(params: GenerateSectionParams): string {
    const { jobTitle, company, jobDescription, sectionType, instructions } = params;

    const sectionLabelMap: Record<typeof sectionType, string> = {
      summary: 'a concise 3–4 line professional summary',
      skills: 'a bullet list of 8–12 technical skills',
      experience: 'a bullet list (5–8 bullets) of relevant experience',
      coverLetter: '2–3 paragraphs of a tailored cover letter body',
    };

    let prompt = `You are a professional CV writer.\n\nTarget role: ${jobTitle} at ${company}\n\nJob description:\n${jobDescription}\n\nWrite ${sectionLabelMap[sectionType]}.`;
    if (instructions) {
      prompt += `\n\nUSER INSTRUCTIONS FOR REFINEMENT:\n${instructions}`;
    }
    prompt += `\n\nReturn plain text only (no LaTeX preamble).`;

    return prompt;
  }
}
