// Fetch a single job and update sections

// apps/frontend/hooks/useJobDetail.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { JobApplication, LatexSnippets } from '../lib/types';
import { apiGet, apiPost } from '../lib/apiClient';
import { TailoredSectionsInput } from '../lib/validation/jobSchemas';

export function useJobDetail(id: string) {
  const queryClient = useQueryClient();

  const jobQuery = useQuery<JobApplication>({
    queryKey: ['jobs', id],
    queryFn: () => apiGet<JobApplication>(`/jobs/${id}`),
    enabled: !!id,
  });

  const updateSections = useMutation({
    mutationFn: (payload: TailoredSectionsInput) =>
      apiPost<JobApplication>(`/jobs/${id}/sections`, payload, 'PATCH'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs', id] });
    },
  });

  const aiDraftMutation = useMutation({
    mutationFn: (sectionType: keyof TailoredSectionsInput) =>
      apiPost<JobApplication>(
        `/jobs/${id}/ai-draft?sectionType=${sectionType}`,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs', id] });
    },
  });

  const latexSnippetsQuery = useQuery<LatexSnippets>({
    queryKey: ['jobs', id, 'latex-snippets'],
    queryFn: () => apiGet<LatexSnippets>(`/jobs/${id}/latex-snippets`),
    enabled: false, // triggered manually
  });

  return {
    jobQuery,
    updateSections,
    aiDraftMutation,
    latexSnippetsQuery,
  };
}
