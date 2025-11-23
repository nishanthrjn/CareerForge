// apps/backend/src/jobs/infrastructure/application/jobs.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  JobApplication,
  JobApplicationDocument,
} from '../../domain/job-application.schema';
import { JobStatus, TailoredSectionsProps } from '../../domain/job-application.types';

import { CreateJobApplicationDto } from '../../dto/create-job-application.dto';
import { UpdateTailoredSectionsDto } from '../../dto/update-tailored-sections.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(JobApplication.name)
    private readonly jobModel: Model<JobApplicationDocument>,
  ) {}

  async create(dto: CreateJobApplicationDto): Promise<JobApplication> {
    const doc = new this.jobModel({
      title: dto.title,
      company: dto.company,
      location: dto.location,
      jobDescription: dto.jobDescription,
      status: JobStatus.DRAFT, // default status
    });

    return doc.save();
  }

  async findAll(): Promise<JobApplication[]> {
    return this.jobModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<JobApplication> {
    const job = await this.jobModel.findById(id).exec();
    if (!job) {
      throw new NotFoundException(`Job with id ${id} not found`);
    }
    return job;
  }

  // 👇 This is the method that was causing syntax errors.
  // Now it is INSIDE the JobsService class, with correct syntax.
  async updateTailoredSections(
    id: string,
    dto: UpdateTailoredSectionsDto,
  ): Promise<JobApplication> {
    const existing = await this.jobModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException(`Job with id ${id} not found`);
    }

    const current = existing.tailoredSections ?? ({} as TailoredSectionsProps);

    const mergedSections: TailoredSectionsProps = {
      summary: dto.summary ?? current.summary ?? '',
      skills: dto.skills ?? current.skills ?? '',
      experience: dto.experience ?? current.experience ?? '',
      coverLetter: dto.coverLetter ?? current.coverLetter ?? '',
    };

    existing.tailoredSections = mergedSections as any;
    return existing.save();
  }
}
