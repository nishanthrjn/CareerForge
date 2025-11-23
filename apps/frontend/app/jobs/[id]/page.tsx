// Job detail + tailored editor page

// apps/frontend/app/jobs/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useJobDetail } from '../../../hooks/useJobDetail';
import { useForm } from 'react-hook-form';
import { TailoredSectionsInput, tailoredSectionsSchema } from '../../../lib/validation/jobSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

export default function JobDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;
  const { jobQuery, updateSections, aiDraftMutation } = useJobDetail(id);

  const form = useForm<TailoredSectionsInput>({
    resolver: zodResolver(tailoredSectionsSchema),
    values: jobQuery.data?.tailoredSections ?? {
      summary: '',
      skills: '',
      experience: '',
      coverLetter: '',
    },
  });

  // Sync form when job data loads
  if (jobQuery.data && !form.formState.isDirty) {
    form.reset(jobQuery.data.tailoredSections);
  }

  const onSubmit = (values: TailoredSectionsInput) => {
    updateSections.mutate(values);
  };

  const handleAiDraft = (sectionType: keyof TailoredSectionsInput) => {
    aiDraftMutation.mutate(sectionType);
  };

  if (jobQuery.isLoading) return <p>Loading...</p>;
  if (jobQuery.isError || !jobQuery.data)
    return <p className="text-red-600">Failed to load job</p>;

  const job = jobQuery.data;

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => router.back()}
        className="text-xs text-slate-600 hover:underline"
      >
        ← Back to jobs
      </button>

      <section className="rounded-xl border bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold">
          {job.title} @ {job.company}
        </h2>
        <p className="text-xs text-slate-600">
          {job.location} · status: {job.status}
        </p>
        <p className="mt-2 whitespace-pre-wrap text-xs text-slate-700">
          {job.jobDescription}
        </p>
        {job.referenceLink && (
          <a
            href={job.referenceLink}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-xs text-blue-600 hover:underline"
          >
            View job ad
          </a>
        )}
      </section>

      <section className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold">
            Tailored CV &amp; Cover Letter Content
          </h3>
          <Link
            href={`/jobs/${job._id}/latex`}
            className="text-xs font-medium text-blue-600 hover:underline"
          >
            View LaTeX snippets →
          </Link>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-3 grid gap-4 md:grid-cols-2"
        >
          {/* CV Summary */}
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <label className="font-medium">CV Summary</label>
              <button
                type="button"
                onClick={() => handleAiDraft('summary')}
                className="rounded border px-2 py-0.5 text-[11px] hover:bg-slate-50"
              >
                AI Draft
              </button>
            </div>
            <textarea
              rows={6}
              className="mt-1 w-full rounded border px-2 py-1"
              {...form.register('summary')}
            />
          </div>

          {/* CV Skills */}
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <label className="font-medium">CV Skills (one per line)</label>
              <button
                type="button"
                onClick={() => handleAiDraft('skills')}
                className="rounded border px-2 py-0.5 text-[11px] hover:bg-slate-50"
              >
                AI Draft
              </button>
            </div>
            <textarea
              rows={6}
              className="mt-1 w-full rounded border px-2 py-1"
              {...form.register('skills')}
            />
          </div>

          {/* CV Experience */}
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <label className="font-medium">
                CV Experience (bullet lines)
              </label>
              <button
                type="button"
                onClick={() => handleAiDraft('experience')}
                className="rounded border px-2 py-0.5 text-[11px] hover:bg-slate-50"
              >
                AI Draft
              </button>
            </div>
            <textarea
              rows={8}
              className="mt-1 w-full rounded border px-2 py-1"
              {...form.register('experience')}
            />
          </div>

          {/* Cover Letter Body */}
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <label className="font-medium">Cover Letter Body</label>
              <button
                type="button"
                onClick={() => handleAiDraft('coverLetter')}
                className="rounded border px-2 py-0.5 text-[11px] hover:bg-slate-50"
              >
                AI Draft
              </button>
            </div>
            <textarea
              rows={8}
              className="mt-1 w-full rounded border px-2 py-1"
              {...form.register('coverLetter')}
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={updateSections.isPending}
              className="rounded bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {updateSections.isPending ? 'Saving...' : 'Save Sections'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
