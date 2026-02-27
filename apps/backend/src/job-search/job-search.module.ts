import { Module } from '@nestjs/common';
import { JobSearchController } from './job-search.controller';
import { JobSearchService } from './job-search.service';
import { AiModule } from '../ai/ai.module';
import { JobsModule } from '../jobs/jobs.module';

@Module({
    imports: [AiModule, JobsModule],
    controllers: [JobSearchController],
    providers: [JobSearchService],
    exports: [JobSearchService],
})
export class JobSearchModule { }
