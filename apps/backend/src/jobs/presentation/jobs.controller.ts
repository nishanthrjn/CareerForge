// apps/backend/src/jobs/presentation/jobs.controller.ts
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { JobsService } from '../jobs.service';
import { UpdateTailoredSectionsDto } from '../dto/update-tailored-sections.dto';
import { ApiResponse } from '../../shared/api-response';

// ... existing decorators
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // existing routes...

  @Patch(':id/sections')
  async updateSections(
    @Param('id') id: string,
    @Body() dto: UpdateTailoredSectionsDto,
  ): Promise<ApiResponse<any>> {
    const job = await this.jobsService.updateTailoredSections(id, dto);
    return { success: true, data: job };
  }
}
