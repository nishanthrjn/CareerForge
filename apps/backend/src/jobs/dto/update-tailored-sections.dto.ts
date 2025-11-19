// apps/backend/src/jobs/dto/update-tailored-sections.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class UpdateTailoredSectionsDto {
  @IsOptional()
  @IsString()
  cvSummary?: string;

  @IsOptional()
  @IsString()
  cvSkills?: string;

  @IsOptional()
  @IsString()
  cvExperience?: string;

  @IsOptional()
  @IsString()
  coverLetterBody?: string;
}
