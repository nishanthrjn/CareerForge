// Jobs service (use cases)

// apps/backend/src/jobs/jobs.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  JobApplication,
  JobApplicationDocument,
  JobStatus,
} from './domain/job-application.schema';
import { Model } from 'mongoose';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateTailoredSectionsDto } from './dto/update-tailored-sections.dto';
import { AiService } from '../ai/ai.service';
import { LatexTemplateService, LatexSnippets } from '../latex/latex-template.service';
import { JobRepository } from './infrastructure/job.repository';

@Injectable()
export class JobsService {
  constructor(
    private readonly jobRepo: JobRepository,
    private readonly aiService: AiService,
    private readonly latexService: LatexTemplateService,
  ) { }

  async createJob(dto: CreateJobApplicationDto): Promise<JobApplicationDocument> {
    return this.jobRepo.create({
      ...dto,
      status: JobStatus.NEW,
      tailoredSections: {
        summary: '',
        skills: '',
        experience: '',
        coverLetter: '',
      },
    });
  }

  async listJobs(): Promise<JobApplicationDocument[]> {
    return this.jobRepo.listJobsSorted();
  }

  async getJob(id: string): Promise<JobApplicationDocument> {
    const job = await this.jobRepo.findById(id);
    if (!job) {
      throw new NotFoundException('JobApplication not found');
    }
    return job;
  }

  async updateTailoredSections(
    id: string,
    dto: UpdateTailoredSectionsDto,
  ): Promise<JobApplicationDocument> {
    const job = await this.getJob(id);
    job.tailoredSections = {
      ...job.tailoredSections,
      ...dto,
    };
    return this.jobRepo.updateById(id, { tailoredSections: job.tailoredSections }) as Promise<JobApplicationDocument>;
  }

  async generateAiDraftForSection(
    id: string,
    sectionType: 'summary' | 'skills' | 'experience' | 'coverLetter',
    instructions?: string,
  ): Promise<{ job: JobApplicationDocument; providerUsed: string }> {
    const job = await this.getJob(id);
    const draft = await this.aiService.generateSection({
      jobTitle: job.title,
      company: job.company,
      jobDescription: job.jobDescription,
      sectionType,
      instructions,
    });

    job.tailoredSections = {
      ...job.tailoredSections,
      [sectionType]: draft.content,
    };

    const updatedJob = await this.jobRepo.updateById(id, { tailoredSections: job.tailoredSections }) as JobApplicationDocument;
    return { job: updatedJob, providerUsed: draft.providerUsed };
  }

  async generateLatexSnippets(id: string): Promise<LatexSnippets> {
    const job = await this.getJob(id);
    return this.latexService.buildSnippets(
      job.title,
      job.company,
      job.location,
      job.tailoredSections,
    );
  }
}
