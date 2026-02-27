// apps/backend/src/ai/providers/openai.provider.ts
import { ILLMProvider, GenerateSectionParams } from '../llm-provider.interface';
import OpenAI from 'openai';

export class OpenAiProvider implements ILLMProvider {
  name = 'openai';

  constructor(private readonly client: OpenAI) { }

  async generateSection(params: GenerateSectionParams): Promise<string> {
    const prompt = this.buildPrompt(params);

    const completion = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
    });

    return completion.choices[0]?.message?.content ?? '';
  }

  async generateText(prompt: string): Promise<string> {
    const completion = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
    });

    return completion.choices[0]?.message?.content ?? '';
  }

  private buildPrompt(params: GenerateSectionParams): string {
    const { jobTitle, company, jobDescription, sectionType, instructions } = params;

    const sectionLabelMap: Record<typeof sectionType, string> = {
      summary:
        'a concise 3–4 line professional summary focusing on this role',
      skills:
        'a bullet list of 8–12 technical skills mapped to this job description',
      experience:
        'a bullet list (5–8 bullets) highlighting relevant experience, quantified where possible',
      coverLetter:
        '2–3 paragraphs of a tailored cover letter body (no greeting or signature)',
    };

    let prompt = `You are a professional CV & cover letter writer for the tech job market.\n\nTarget position: ${jobTitle} at ${company}\n\nJob description:\n---\n${jobDescription}\n---\n\nWrite ${sectionLabelMap[sectionType]}.`;
    if (instructions) {
      prompt += `\n\nUSER INSTRUCTIONS FOR REFINEMENT:\n${instructions}`;
    }
    prompt += `\n\nReturn only plain text suitable to be embedded inside a LaTeX file (no preamble).`;

    return prompt;
  }
}
