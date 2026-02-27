// Jobs controller (HTTP adapter)

/*
Vertical slice endpoints:

POST /api/jobs – create job.

GET /api/jobs – list jobs.

GET /api/jobs/:id – fetch job + tailored sections.

PATCH /api/jobs/:id/sections – update tailored sections.

POST /api/jobs/:id/ai-draft?sectionType=summary – AI draft.

GET /api/jobs/:id/latex-snippets – LaTeX partials.
*/

// apps/backend/src/jobs/jobs.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { SkillGapService } from './skill-gap.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateTailoredSectionsDto } from './dto/update-tailored-sections.dto';
import { ApiResponse } from '../common/api-response';

@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
    private readonly skillGapService: SkillGapService,
  ) { }

  @Post()
  async createJob(
    @Body() dto: CreateJobApplicationDto,
  ): Promise<ApiResponse<any>> {
    const job = await this.jobsService.createJob(dto);
    return ApiResponse.ok(job);
  }

  @Get()
  async listJobs(): Promise<ApiResponse<any>> {
    const jobs = await this.jobsService.listJobs();
    return ApiResponse.ok(jobs);
  }

  @Get(':id')
  async getJob(@Param('id') id: string): Promise<ApiResponse<any>> {
    const job = await this.jobsService.getJob(id);
    return ApiResponse.ok(job);
  }

  @Patch(':id/sections')
  async updateSections(
    @Param('id') id: string,
    @Body() dto: UpdateTailoredSectionsDto,
  ): Promise<ApiResponse<any>> {
    const job = await this.jobsService.updateTailoredSections(id, dto);
    return ApiResponse.ok(job);
  }

  @Post(':id/ai-draft')
  async aiDraft(
    @Param('id') id: string,
    @Query('sectionType') sectionType: 'summary' | 'skills' | 'experience' | 'coverLetter',
    @Body('instructions') instructions?: string,
  ): Promise<ApiResponse<any>> {
    const job = await this.jobsService.generateAiDraftForSection(
      id,
      sectionType,
      instructions,
    );
    return ApiResponse.ok(job);
  }

  @Get(':id/latex-snippets')
  async latexSnippets(
    @Param('id') id: string,
  ): Promise<ApiResponse<any>> {
    const snippets = await this.jobsService.generateLatexSnippets(id);
    return ApiResponse.ok(snippets);
  }
}
