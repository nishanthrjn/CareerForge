// apps/backend/src/ai/providers/openai.provider.ts
import { ILLMProvider, GenerateSectionParams } from '../llm-provider.interface';
import OpenAI from 'openai';

export class OpenAiProvider implements ILLMProvider {
  name = 'openai';

  constructor(private readonly client: OpenAI) {}

  async generateSection(params: GenerateSectionParams): Promise<string> {
    const prompt = this.buildPrompt(params);

    const completion = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
    });

    return completion.choices[0]?.message?.content ?? '';
  }

  private buildPrompt(params: GenerateSectionParams): string {
    const { jobTitle, company, jobDescription, sectionType } = params;

    const sectionLabelMap: Record<typeof sectionType, string> = {
      cvSummary:
        'a concise 3–4 line professional summary focusing on this role',
      cvSkills:
        'a bullet list of 8–12 technical skills mapped to this job description',
      cvExperience:
        'a bullet list (5–8 bullets) highlighting relevant experience, quantified where possible',
      coverLetterBody:
        '2–3 paragraphs of a tailored cover letter body (no greeting or signature)',
    };

    return `
You are a professional CV & cover letter writer for the European tech job market.

Target position: ${jobTitle} at ${company}

Job description:
---
${jobDescription}
---

Write ${sectionLabelMap[sectionType]}.
Return only plain text suitable to be embedded inside a LaTeX file (no preamble).
`.trim();
  }
}
