// Purpose: Models the core entity we care about: a job plus its tailored CV/CL sections.
// Job domain model & schema
// apps/backend/src/jobs/domain/job-application.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { JobStatus } from './job-application.types';

export type JobApplicationDocument = HydratedDocument<JobApplication>;

// 1) Embedded TailoredSections schema for MongoDB (separate from TailoredSectionsProps)
@Schema({ _id: false })
export class TailoredSections {
  @Prop()
  summary?: string;

  @Prop()
  skills?: string;

  @Prop()
  experience?: string;

  @Prop()
  coverLetter?: string;
}

export const TailoredSectionsSchema = SchemaFactory.createForClass(TailoredSections);

// 2) Main JobApplication schema
@Schema({ timestamps: true })
export class JobApplication {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  company!: string;

  @Prop({ required: true })
  location!: string;

  @Prop({ required: true })
  jobDescription!: string;

  @Prop({ required: true, enum: JobStatus, default: JobStatus.NEW })
  status!: JobStatus;

  @Prop({ type: TailoredSectionsSchema })
  tailoredSections!: TailoredSections;

  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt!: Date;
}

export const JobApplicationSchema = SchemaFactory.createForClass(JobApplication);
