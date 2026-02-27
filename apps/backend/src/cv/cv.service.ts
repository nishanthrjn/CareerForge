import { Injectable, Logger } from '@nestjs/common';
import { UserProfileRepository } from './infrastructure/user-profile.repository';
import { AiService } from '../ai/ai.service';
import { UserProfileDocument } from './domain/user-profile.schema';
const pdfParse = require('pdf-parse');

@Injectable()
export class CvService {
  private readonly logger = new Logger(CvService.name);

  constructor(
    private readonly repo: UserProfileRepository,
    private readonly aiService: AiService,
  ) { }

  async parseAndExtractCv(fileBuffer: Buffer): Promise<UserProfileDocument> {
    // 1. Extract raw text from PDF
    let rawText = '';
    try {
      const parsed = await pdfParse(fileBuffer);
      rawText = parsed.text;
    } catch (e: any) {
      throw new Error(`Failed to parse PDF: ${e.message}`);
    }

    if (!rawText.trim()) {
      throw new Error('PDF contains no readable text.');
    }

    // 2. Build extraction prompt
    const prompt = `
You are an expert ATS (Applicant Tracking System) parser. Read the following CV text and extract the information into a strict JSON format.

CV Text:
---
${rawText.substring(0, 15000)}
---

Output valid JSON ONLY with the following structure. Do not output markdown code blocks, just raw JSON text:
{
  "summary": "A brief professional summary",
  "skills": ["Skill 1", "Skill 2"],
  "experience": [
    {
      "role": "Job Title",
      "company": "Company Name",
      "duration": "e.g., Jan 2020 - Present",
      "bullets": ["Achievement 1", "Achievement 2"]
    }
  ],
  "education": [
    {
      "degree": "Degree Name",
      "institution": "University/School",
      "year": "e.g., 2019"
    }
  ]
}`;

    // 3. Call AI to extract structured JSON
    try {
      const result = await this.aiService.generateText(prompt);
      const jsonStr = result.content.replace(/```json/g, '').replace(/```/g, '').trim();
      const extractedData = JSON.parse(jsonStr);

      // 4. Save to MongoDB
      return this.repo.create({
        summary: extractedData.summary || '',
        skills: extractedData.skills || [],
        experience: extractedData.experience || [],
        education: extractedData.education || [],
        rawParsedText: rawText,
      });

    } catch (e: any) {
      this.logger.error('Failed to extract structured data from CV via AI', e);
      throw new Error('Failed to extract structured data via AI. Please try again.');
    }
  }

  async getAllProfiles(): Promise<UserProfileDocument[]> {
    return this.repo.findAll();
  }
}
