// LaTeX Template Builder
// Pattern: Simple Builder/Factory
// The service knows how to assemble LaTeX partials for your Overleaf files.

// apps/backend/src/latex/latex-template.service.ts
import { Injectable } from '@nestjs/common';
import { TailoredSectionsProps } from '../jobs/domain/job-application.types';

export type LatexSnippets = {
  ccSummary: string;
  ccSkills: string;
  ccExperience: string;
  coverData: string;
};

@Injectable()
export class LatexTemplateService {
  buildSnippets(
    jobTitle: string,
    company: string,
    location: string,
    sections: TailoredSectionsProps,
  ): LatexSnippets {
    // Normalize optional fields to empty strings so we don't crash on undefined
    const summaryText = sections.summary ?? '';
    const skillsText = sections.skills ?? '';
    const experienceText = sections.experience ?? '';
    const coverLetterText = sections.coverLetter ?? '';

    // These templates should be adapted to your actual Overleaf files.
    const ccSummary = `% ccSummary.tex
\\cvsection{Summary}
${summaryText}
`;

    const ccSkills = `% ccSkills.tex
\\cvsection{Skills}
\\begin{itemize}
${this.toLatexList(skillsText)}
\\end{itemize}
`;

    const ccExperience = `% ccExperience.tex
\\cvsection{Experience}
\\begin{itemize}
${this.toLatexList(experienceText)}
\\end{itemize}
`;

    const coverData = `% cover_data.tex
\\newcommand{\\coverCompany}{${this.escapeLatex(company)}}
\\newcommand{\\coverPosition}{${this.escapeLatex(jobTitle)}}
\\newcommand{\\coverLocation}{${this.escapeLatex(location)}}

% Body
${coverLetterText}
`;

    return { ccSummary, ccSkills, ccExperience, coverData };
  }

  private toLatexList(raw?: string): string {
    // assumes bullets separated by newlines or '- '
    const text = raw ?? '';
    const lines = text
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    return lines.map((l) => `  \\item ${this.escapeLatex(l)}`).join('\n');
  }

  private escapeLatex(text: string): string {
    // very simple escaping for common chars
    return text
      .replace(/\\/g, '\\textbackslash{}')
      .replace(/%/g, '\\%')
      .replace(/&/g, '\\&')
      .replace(/_/g, '\\_')
      .replace(/{/g, '\\{')
      .replace(/}/g, '\\}')
      .replace(/\$/g, '\\$')
      .replace(/#/g, '\\#');
  }
}
