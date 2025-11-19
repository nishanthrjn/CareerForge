'use client';

import { useJobApplications } from '../../hooks/useJobApplications';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateJobInput,
  createJobSchema,
} from '../../lib/validation/jobSchemas';
import Link from 'next/link';

export default function JobsPage() {
  const { jobsQuery, createJobMutation } = useJobApplications();

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
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr,1.6fr]">
      {/* Job list card */}
      <section className="glass-card flex flex-col p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div>
            <h2 className="section-title">Job Applications</h2>
            <p className="section-subtitle">
              Browse and open tailored CV / cover letter workspaces.
            </p>
          </div>
          {jobsQuery.data && jobsQuery.data.length > 0 && (
            <span className="glass-chip text-[11px]">
              {jobsQuery.data.length} job
              {jobsQuery.data.length > 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="flex-1 overflow-hidden">
          {jobsQuery.isLoading ? (
            <p className="text-xs text-slate-300">Loading jobs…</p>
          ) : jobsQuery.isError ? (
            <p className="text-xs text-red-400">Failed to load jobs.</p>
          ) : jobsQuery.data && jobsQuery.data.length > 0 ? (
            <ul className="space-y-3 overflow-y-auto pr-1">
              {jobsQuery.data.map((job) => (
                <li
                  key={job._id}
                  className="group rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs text-slate-100/90 hover:bg-white/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-50">
                        {job.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-300">
                        {job.company} · {job.location}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-900/60 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-200">
                      {job.status}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-[11px] text-slate-300/90">
                    {job.jobDescription}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    {job.referenceLink && (
                      <a
                        href={job.referenceLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-slate-300 underline-offset-2 hover:text-slate-100 hover:underline"
                      >
                        View job ad
                      </a>
                    )}
                    <Link
                      href={`/jobs/${job._id}`}
                      className="secondary-btn text-[11px]"
                    >
                      Open workspace →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-3 rounded-xl border border-dashed border-white/15 bg-white/5 px-4 py-6 text-center text-xs text-slate-300">
              No jobs yet. Use the form on the right to add your first target
              position.
            </div>
          )}
        </div>
      </section>

      {/* Create job card */}
      <section className="glass-card p-4 md:p-5">
        <div className="mb-3">
          <h2 className="section-title">Add New Job</h2>
          <p className="section-subtitle">
            Paste the job description and basic details. You&apos;ll tailor CV
            sections on the next screen.
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 text-xs"
        >
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="block text-[11px] font-medium text-slate-200">
                Job Title
              </label>
              <input
                className="mt-1 input-field"
                placeholder="Senior .NET Engineer"
                {...form.register('title')}
              />
              <p className="mt-0.5 text-[11px] text-red-300">
                {form.formState.errors.title?.message}
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-200">
                Company
              </label>
              <input
                className="mt-1 input-field"
                placeholder="Awesome GmbH"
                {...form.register('company')}
              />
              <p className="mt-0.5 text-[11px] text-red-300">
                {form.formState.errors.company?.message}
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="block text-[11px] font-medium text-slate-200">
                Location
              </label>
              <input
                className="mt-1 input-field"
                placeholder="Hamburg, Germany"
                {...form.register('location')}
              />
              <p className="mt-0.5 text-[11px] text-red-300">
                {form.formState.errors.location?.message}
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-200">
                Reference Link (optional)
              </label>
              <input
                className="mt-1 input-field"
                placeholder="https://..."
                {...form.register('referenceLink')}
              />
              <p className="mt-0.5 text-[11px] text-red-300">
                {form.formState.errors.referenceLink?.message}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-200">
              Job Description
            </label>
            <textarea
              className="mt-1 textarea-field"
              placeholder="Paste the full job description here…"
              rows={7}
              {...form.register('jobDescription')}
            />
            <p className="mt-0.5 text-[11px] text-red-300">
              {form.formState.errors.jobDescription?.message}
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={createJobMutation.isPending}
              className="primary-btn text-xs"
            >
              {createJobMutation.isPending ? 'Creating…' : 'Create Job'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
