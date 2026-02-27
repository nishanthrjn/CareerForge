import { Injectable, Logger } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { JobRepository } from '../jobs/infrastructure/job.repository';
import { UserProfileRepository } from '../cv/infrastructure/user-profile.repository';

@Injectable()
export class SkillGapService {
    private readonly logger = new Logger(SkillGapService.name);

    constructor(
        private readonly jobRepo: JobRepository,
        private readonly userRepo: UserProfileRepository,
        private readonly aiService: AiService,
    ) { }

    async analyzeGap(jobId: string, profileId: string): Promise<{ missingSkills: string[]; improvements: string }> {
        const job = await this.jobRepo.findById(jobId);
        if (!job) throw new Error('Job not found');

        const profile = await this.userRepo.findById(profileId);
        if (!profile) throw new Error('User profile not found');

        const prompt = `
Analyze the skill gap between the candidate's skills and the job's required skills.

Candidate Skills: ${profile.skills.join(', ')}
Job Title: ${job.title}
Job Description:
${job.jobDescription}

Output a strictly formatted JSON object with no markdown fences:
{
  "missingSkills": ["Skill 1", "Skill 2"],
  "improvements": "1-2 short sentences suggesting how to overcome these gaps or frame existing experience."
}`;

        try {
            const response = await this.aiService.generateText(prompt);
            const cleanedJson = response.content.replace(/```json/g, '').replace(/```/g, '').trim();
            const analysis = JSON.parse(cleanedJson);

            // Save to job
            await this.jobRepo.updateById(jobId, { missingSkills: analysis.missingSkills });

            return analysis;
        } catch (e: any) {
            this.logger.error('Failed skill gap analysis', e);
            throw new Error('Failed to analyze skill gap.');
        }
    }
}
