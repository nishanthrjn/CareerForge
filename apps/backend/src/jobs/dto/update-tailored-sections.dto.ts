// apps/backend/src/jobs/dto/update-tailored-sections.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class UpdateTailoredSectionsDto {
  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  skills?: string;

  @IsOptional()
  @IsString()
  experience?: string;

  @IsOptional()
  @IsString()
  coverLetter?: string;
}
