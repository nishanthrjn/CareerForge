// apps/frontend/lib/validation/jobSchemas.ts
import { z } from 'zod';

// Schema used when creating a job
export const createJobSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  location: z.string().min(1, 'Location is required'),
  jobDescription: z.string().min(1, 'Job description is required'),
  referenceLink: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')), // allow empty string if you want
});

export type CreateJobInput = z.infer<typeof createJobSchema>;

// Schema for the tailored sections (this is what your page.tsx expects)
export const tailoredSectionsSchema = z.object({
  summary: z.string().default(''),
  skills: z.string().default(''),
  experience: z.string().default(''),
  coverLetter: z.string().default(''),
});

export type TailoredSectionsInput = z.infer<typeof tailoredSectionsSchema>;
