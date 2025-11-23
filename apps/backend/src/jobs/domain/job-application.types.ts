//Job domain model & schema
// Purpose: Models the core entity we care about: a job plus its tailored CV/CL sections.

// apps/backend/src/jobs/domain/job-application.types.ts

// 1) Status enum used both as type & value
export enum JobStatus {
  DRAFT = 'draft',
  READY = 'ready',
  NEW = 'new',
  APPLIED = 'applied',
  INTERVIEW = 'interview',
  OFFER = 'offer',
  REJECTED = 'rejected',
}

// 2) Pure TypeScript shape of tailored sections (domain-level)
export type TailoredSectionsProps = {
  summary?: string;
  skills?: string;
  experience?: string;
  coverLetter?: string;
};

export type JobApplicationProps = {
  _id: string;
  title: string;
  company: string;
  location: string;
  jobDescription: string;
  referenceLink?: string;
  status: JobStatus;
  tailoredSections: TailoredSectionsProps;
  createdAt: Date;
  updatedAt: Date;
}