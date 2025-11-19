// Zod schemas (for forms)

// apps/frontend/lib/validation/jobSchemas.ts
import { z } from 'zod';

export const createJobSchema = z.object({
  title: z.string().min(3),
  company: z.string().min(2),
  location: z.string().min(2),
  jobDescription: z.string().min(10),
  referenceLink: z.string().url().optional().or(z.literal('')),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;

export const tailoredSectionsSchema = z.object({
  cvSummary: z.string().optional(),
  cvSkills: z.string().optional(),
  cvExperience: z.string().optional(),
  coverLetterBody: z.string().optional(),
});

export type TailoredSectionsInput = z.infer<typeof tailoredSectionsSchema>;
