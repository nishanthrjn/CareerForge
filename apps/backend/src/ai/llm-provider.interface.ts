// AI Provider interface & module (Strategy Pattern)
// Pattern: Strategy
//ILLMProvider defines the strategy interface.
//Concrete providers implement it.
//AiService is the context; it delegates to the chosen strategy based on configuration.

// apps/backend/src/ai/llm-provider.interface.ts
export interface GenerateSectionParams {
  jobTitle: string;
  company: string;
  jobDescription: string;
  sectionType: 'summary' | 'skills' | 'experience' | 'coverLetter';
  instructions?: string;
}

export interface ILLMProvider {
  name: string;
  generateSection(params: GenerateSectionParams): Promise<string>;
  generateText(prompt: string): Promise<string>;
}
