// Jobs service (use cases)

// apps/backend/src/jobs/jobs.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  JobApplication,
  JobApplicationDocument,
} from './domain/job-application.schema';
import { Model } from 'mongoose';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateTailoredSectionsDto } from './dto/update-tailored-sections.dto';
import { AiService } from '../ai/ai.service';
import { LatexTemplateService, LatexSnippets } from '../latex/latex-template.service';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(JobApplication.name)
    private readonly jobModel: Model<JobApplicationDocument>,
    private readonly aiService: AiService,
    private readonly latexService: LatexTemplateService,
  ) {}

  async createJob(dto: CreateJobApplicationDto): Promise<JobApplicationDocument> {
    const job = new this.jobModel({
      ...dto,
      status: 'draft',
      tailoredSections: {
        summary: '',
        skills: '',
        experience: '',
        coverLetter: '',
      },
    });
    return job.save();
  }

  async listJobs(): Promise<JobApplicationDocument[]> {
    return this.jobModel.find().sort({ createdAt: -1 }).exec();
  }

  async getJob(id: string): Promise<JobApplicationDocument> {
    const job = await this.jobModel.findById(id).exec();
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
    return job.save();
  }

  async generateAiDraftForSection(
    id: string,
    sectionType: 'summary' | 'skills' | 'experience' | 'coverLetter',
  ): Promise<JobApplicationDocument> {
    const job = await this.getJob(id);
    const draft = await this.aiService.generateSection({
      jobTitle: job.title,
      company: job.company,
      jobDescription: job.jobDescription,
      sectionType,
    });

    job.tailoredSections = {
      ...job.tailoredSections,
      [sectionType]: draft,
    };

    return job.save();
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
