// apps/frontend/components/jobs/JobCreateForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateJobInput,
  createJobSchema,
} from '../../lib/validation/jobSchemas';
import { useJobApplications } from '../../hooks/useJobApplications';
import { GlassCard } from '../ui/GlassCard';
import { SectionHeader } from '../ui/SectionHeader';
import { FieldWrapper, TextArea, TextInput } from '../ui/Fields';
import { PrimaryButton } from '../ui/Buttons';
import { FilePlus2, Loader2 } from 'lucide-react';

export function JobCreateForm() {
  const { createJobMutation } = useJobApplications();

  const form = useForm<CreateJobInput>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: '',
      company: '',
      location: '',
      jobDescription: '',
      referenceLink: '',
    },
  });

  const onSubmit = (values: CreateJobInput) => {
    const payload = {
      ...values,
      referenceLink: values.referenceLink || undefined,
    };
    createJobMutation.mutate(payload, {
      onSuccess: () => form.reset(),
    });
  };

  const errors = form.formState.errors;

  return (
    <GlassCard className="relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />

      <SectionHeader
        title={<div className="flex items-center gap-2"><FilePlus2 className="w-5 h-5 text-indigo-300" /> Add Target Position</div>}
        subtitle="Paste the job description and basic details. You'll tailor CV sections on the next screen."
      />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 text-sm relative z-10 p-2"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FieldWrapper
            label="Job Title"
            helperText={errors.title?.message}
          >
            <TextInput
              placeholder="e.g. Senior Full-Stack Engineer"
              {...form.register('title')}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Company"
            helperText={errors.company?.message}
          >
            <TextInput
              placeholder="e.g. TechCorp GmbH"
              {...form.register('company')}
            />
          </FieldWrapper>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FieldWrapper
            label="Location / Model"
            helperText={errors.location?.message}
          >
            <TextInput
              placeholder="e.g. Remote, Berlin"
              {...form.register('location')}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Reference Link (optional)"
            helperText={errors.referenceLink?.message}
          >
            <TextInput
              placeholder="https://..."
              {...form.register('referenceLink')}
            />
          </FieldWrapper>
        </div>

        <FieldWrapper
          label="Job Description"
          helperText={errors.jobDescription?.message}
        >
          <TextArea
            placeholder="Paste the full job description here. Our AI will analyze the required skills against your profile..."
            rows={10}
            className="md:h-64"
            {...form.register('jobDescription')}
          />
        </FieldWrapper>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
          <PrimaryButton
            type="submit"
            disabled={createJobMutation.isPending}
            className="w-full md:w-auto px-8 py-2.5"
          >
            {createJobMutation.isPending ? (
              <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Adding...</span>
            ) : (
              'Track Job'
            )}
          </PrimaryButton>
        </div>
      </form>
    </GlassCard>
  );
}
