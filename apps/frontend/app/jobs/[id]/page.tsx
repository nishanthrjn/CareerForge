// apps/frontend/app/jobs/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useJobDetail } from '../../../hooks/useJobDetail';
import { useForm } from 'react-hook-form';
import { TailoredSectionsInput, tailoredSectionsSchema } from '../../../lib/validation/jobSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { ChevronLeft, Sparkles, Building2, MapPin, ExternalLink, Loader2, Save, Send } from 'lucide-react';
import { StatusPill } from '../../../components/ui/StatusPill';

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

  if (jobQuery.data && !form.formState.isDirty) {
    form.reset(jobQuery.data.tailoredSections);
  }

  const onSubmit = (values: TailoredSectionsInput) => {
    updateSections.mutate(values);
  };

  const handleAiDraft = (sectionType: keyof TailoredSectionsInput) => {
    aiDraftMutation.mutate(sectionType);
  };

  if (jobQuery.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
        <p className="text-slate-300 font-medium">Loading Workspace...</p>
      </div>
    );
  }

  if (jobQuery.isError || !jobQuery.data) {
    return <div className="text-center p-12 text-red-400 bg-red-500/10 rounded-3xl border border-red-500/20">Failed to load workspace.</div>;
  }

  const job = jobQuery.data;

  return (
    <div className="space-y-6 relative max-w-7xl mx-auto">
      {/* Glows */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Tracking
      </button>

      {/* Header Card */}
      <div className="glass-card p-6 md:p-8 relative overflow-hidden group">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-indigo-300" /> {job.company}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-indigo-300" /> {job.location}</span>
              <StatusPill value={job.status} />
            </div>
          </div>
          {job.referenceLink && (
            <a
              href={job.referenceLink}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-indigo-200 hover:bg-white/10 hover:text-white transition-all shadow-sm"
            >
              <ExternalLink className="w-4 h-4" /> Original Post
            </a>
          )}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-slate-950/40 border border-white/5">
          <p className="line-clamp-3 text-sm text-slate-300 leading-relaxed font-mono">
            {job.jobDescription}
          </p>
        </div>

        {job.missingSkills && job.missingSkills.length > 0 && (
          <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4" /> Gap Analysis
            </h3>
            <p className="text-xs text-amber-200/80 mb-3">AI detected these required skills missing from your base CV.</p>
            <div className="flex flex-wrap gap-2">
              {job.missingSkills.map((m: string) => (
                <span key={m} className="px-2.5 py-1 rounded-md bg-amber-500/20 text-xs font-medium text-amber-200 border border-amber-500/30">
                  {m}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="glass-card p-6 md:p-8 space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-bold text-white"><Sparkles className="w-5 h-5 text-indigo-400" /> Tailoring Machine</h2>
                <p className="text-sm text-slate-400 mt-1">Generate dynamic CV partitions tailored specifically to this job description.</p>
              </div>
            </div>

            {/* Sections */}
            {(['summary', 'skills', 'experience', 'coverLetter'] as const).map((section) => (
              <div key={section} className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-indigo-100 uppercase tracking-widest">
                    {section.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAiDraft(section)}
                    disabled={aiDraftMutation.isPending}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-xs font-semibold text-indigo-200 border border-indigo-500/30 transition-all disabled:opacity-50"
                  >
                    {aiDraftMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    Auto-Draft
                  </button>
                </div>
                <textarea
                  {...form.register(section)}
                  rows={section === 'coverLetter' ? 12 : 6}
                  className="w-full p-4 rounded-xl bg-slate-950/50 border border-white/10 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-y"
                  placeholder={`Empty. Click Auto-Draft to generate tailored ${section}...`}
                />
              </div>
            ))}

            <div className="flex justify-end pt-4 border-t border-white/10">
              <button
                type="submit"
                disabled={updateSections.isPending}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-sm font-bold text-white shadow-xl shadow-indigo-500/20 transition-all disabled:opacity-50"
              >
                {updateSections.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Tailored Sections
              </button>
            </div>
          </div>
        </form>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-4">Export</h3>
            <Link
              href={`/jobs/${job._id}/latex`}
              className="flex items-center justify-between w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm text-slate-200 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Send className="w-5 h-5 text-indigo-400" />
                <span className="font-semibold">View LaTeX Output</span>
              </div>
              <ChevronLeft className="w-4 h-4 rotate-180 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
