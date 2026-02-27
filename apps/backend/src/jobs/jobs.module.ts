// apps/backend/src/jobs/jobs.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobApplication,
  JobApplicationSchema,
} from './domain/job-application.schema';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { AiModule } from '../ai/ai.module';
import { LatexModule } from '../latex/latex.module';
import { CvModule } from '../cv/cv.module';
import { SkillGapService } from './skill-gap.service';
import { JobRepository } from './infrastructure/job.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobApplication.name, schema: JobApplicationSchema },
    ]),
    AiModule,
    LatexModule,
    CvModule,
  ],
  controllers: [JobsController],
  providers: [JobRepository, JobsService, SkillGapService],
  exports: [JobRepository, JobsService, SkillGapService],
})
export class JobsModule { }
