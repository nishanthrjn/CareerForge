// LaTeX Template Builder
//Pattern: Simple Builder/Factory
//The service knows how to assemble LaTeX partials for your Overleaf files.

// apps/backend/src/latex/latex.module.ts
import { Module } from '@nestjs/common';
import { LatexTemplateService } from './latex-template.service';

@Module({
  providers: [LatexTemplateService],
  exports: [LatexTemplateService],
})
export class LatexModule {}
