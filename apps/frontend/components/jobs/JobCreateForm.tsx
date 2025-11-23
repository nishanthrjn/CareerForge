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
    console.log('Submitting payload:', payload); // debug
    createJobMutation.mutate(payload, {
      onSuccess: () => form.reset(),
    });
  };

  const errors = form.formState.errors;

  return (
    <GlassCard>
      <SectionHeader
        title="Add New Job"
        subtitle="Paste the job description and basic details. You'll tailor CV sections on the next screen."
      />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 text-xs"
      >
        <div className="grid gap-3 md:grid-cols-2">
          <FieldWrapper
            label="Job Title"
            helperText={errors.title?.message}
          >
            <TextInput
              placeholder="Senior .NET Engineer"
              {...form.register('title')}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Company"
            helperText={errors.company?.message}
          >
            <TextInput
              placeholder="Awesome GmbH"
              {...form.register('company')}
            />
          </FieldWrapper>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <FieldWrapper
            label="Location"
            helperText={errors.location?.message}
          >
            <TextInput
              placeholder="Hamburg, Germany"
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
            placeholder="Paste the full job description here…"
            rows={7}
            {...form.register('jobDescription')}
          />
        </FieldWrapper>

        <div className="flex items-center justify-end gap-3 pt-2">
          <PrimaryButton
            type="submit"
            disabled={createJobMutation.isPending}
          >
            {createJobMutation.isPending ? 'Creating…' : 'Create Job'}
          </PrimaryButton>
        </div>
      </form>
    </GlassCard>
  );
}
