// Simple types mirroring backend

// apps/frontend/lib/types.ts
export type TailoredSections = {
  summary: string;
  skills: string;
  experience: string;
  coverLetter: string;
};

export type JobApplication = {
  _id: string;
  title: string;
  company: string;
  location: string;
  jobDescription: string;
  referenceLink?: string;
  status: 'draft' | 'ready' | 'applied';
  tailoredSections: TailoredSections;
  createdAt: string;
  updatedAt: string;
};

export type LatexSnippets = {
  ccSummary: string;
  ccSkills: string;
  ccExperience: string;
  coverData: string;
};
