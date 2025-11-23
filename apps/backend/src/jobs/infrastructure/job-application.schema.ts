import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TailoredSectionsProps } from '../domain/job-application.types';

@Schema({ timestamps: true })
export class JobApplication extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  company!: string;

  @Prop({ required: true })
  location!: string;

  @Prop({ required: true })
  jobDescription!: string;

  @Prop()
  referenceLink?: string;

  @Prop({ default: 'draft' })
  status!: string;

  @Prop({ type: Object, default: {} })
  tailoredSections!: TailoredSectionsProps;
}

export const JobApplicationSchema =
  SchemaFactory.createForClass(JobApplication);
