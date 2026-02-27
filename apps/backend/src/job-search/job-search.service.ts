import { Injectable, Logger } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { JobRepository } from '../jobs/infrastructure/job.repository';
import { JobStatus } from '../jobs/domain/job-application.schema';
// import axios from 'axios'; // We'd use axios if making real external requests

export interface JobSearchResult {
    title: string;
    company: string;
    location: string;
    jobDescription: string;
    referenceLink: string;
    postedDate: string;
    requiredSkills: string[];
}

@Injectable()
export class JobSearchService {
    private readonly logger = new Logger(JobSearchService.name);

    constructor(
        private readonly aiService: AiService,
        private readonly jobRepo: JobRepository,
    ) { }

    /**
     * Mock implementation. In real life, we would use a scraping service (like brightdata)
     * or a public API.
     */
    async searchJobs(
        keywords: string,
        countries: string,
        roles: string,
    ): Promise<JobSearchResult[]> {
        this.logger.log(`Searching jobs for ${keywords} in ${countries} for roles ${roles}`);

        // MOCK: Generate realistic jobs passing keywords to AI to act as a mock scraper aggregator.
        const prompt = `
Generate 3 realistic job postings based on the following search criteria:
Keywords: ${keywords}
Countries: ${countries}
Roles: ${roles}

Output as a strict JSON array containing exactly this structure for each job. Do not output markdown, just the raw array:
[
  {
    "title": "Software Engineer",
    "company": "Tech Corp",
    "location": "Berlin, Germany",
    "jobDescription": "Full job description text detailing responsibilities and requirements.",
    "referenceLink": "https://linkedin.com/jobs/view/123",
    "postedDate": "2024-02-15",
    "requiredSkills": ["React", "Node.js", "TypeScript"]
  }
]
    `;

        try {
            const aiResponse = await this.aiService.generateText(prompt);
            const cleanedJson = aiResponse.content.replace(/```json/g, '').replace(/```/g, '').trim();
            const results: JobSearchResult[] = JSON.parse(cleanedJson);
            return results;
        } catch (e: any) {
            this.logger.error('Failed to aggregate jobs', e);
            throw new Error('Job aggregation failed. Try different keywords.');
        }
    }

    async saveJobToTracker(job: JobSearchResult): Promise<void> {
        await this.jobRepo.create({
            title: job.title,
            company: job.company,
            location: job.location,
            jobDescription: job.jobDescription,
            referenceLink: job.referenceLink,
            status: JobStatus.NEW,
            tailoredSections: { summary: '', skills: '', experience: '', coverLetter: '' },
        });
    }
}
