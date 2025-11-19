// Job list hooks
// apps/frontend/hooks/useJobApplications.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { JobApplication } from '../lib/types';
import { apiGet, apiPost } from '../lib/apiClient';
import { CreateJobInput } from '../lib/validation/jobSchemas';

export function useJobApplications() {
  const queryClient = useQueryClient();

  const jobsQuery = useQuery<JobApplication[]>({
    queryKey: ['jobs'],
    queryFn: () => apiGet<JobApplication[]>('/jobs'),
  });

  const createJobMutation = useMutation({
    mutationFn: (payload: CreateJobInput) =>
      apiPost<JobApplication>('/jobs', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  return { jobsQuery, createJobMutation };
}
