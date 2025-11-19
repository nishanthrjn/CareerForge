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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobApplication.name, schema: JobApplicationSchema },
    ]),
    AiModule,
    LatexModule,
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
