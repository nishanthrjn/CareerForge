//Purpose: Wire up config, Mongo, AI, LaTeX, and jobs modules into a cohesive app.

// apps/backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MongoModule } from './shared/mongo.module';
import { JobsModule } from './jobs/jobs.module';
import { AiModule } from './ai/ai.module';
import { LatexModule } from './latex/latex.module';
import { CvModule } from './cv/cv.module';
import { JobSearchModule } from './job-search/job-search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongoModule,
    AiModule,
    LatexModule,
    JobsModule,
    CvModule,
    JobSearchModule,
  ],
})
export class AppModule { }
