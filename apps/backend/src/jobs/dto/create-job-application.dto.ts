// DTOs
// apps/backend/src/jobs/dto/create-job-application.dto.ts
import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateJobApplicationDto {
  @IsString()
  title!: string;

  @IsString()
  company!: string;

  @IsString()
  location!: string;

  @IsString()
  jobDescription!: string;

  @IsOptional()
  @IsUrl()
  referenceLink?: string;
}
