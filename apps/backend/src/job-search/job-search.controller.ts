import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { JobSearchService, JobSearchResult } from './job-search.service';
import { ApiResponse } from '../common/api-response';

@Controller('job-search')
export class JobSearchController {
    constructor(private readonly jobSearchService: JobSearchService) { }

    @Get()
    async search(
        @Query('keywords') keywords: string = '',
        @Query('countries') countries: string = '',
        @Query('roles') roles: string = '',
    ): Promise<ApiResponse<JobSearchResult[]>> {
        const results = await this.jobSearchService.searchJobs(keywords, countries, roles);
        return ApiResponse.ok(results);
    }

    @Post('save')
    async saveJob(@Body() job: JobSearchResult): Promise<ApiResponse<null>> {
        await this.jobSearchService.saveJobToTracker(job);
        return ApiResponse.ok(null);
    }
}
