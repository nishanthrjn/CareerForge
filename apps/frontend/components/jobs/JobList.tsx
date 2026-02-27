// apps/frontend/components/jobs/JobList.tsx
'use client';

import { useJobApplications } from '../../hooks/useJobApplications';
import { GlassCard } from '../ui/GlassCard';
import { SectionHeader } from '../ui/SectionHeader';
import { JobListItem } from './JobListItem';
import { Briefcase, Loader2 } from 'lucide-react';

export function JobList() {
  const { jobsQuery } = useJobApplications();

  const count = jobsQuery.data?.length ?? 0;

  return (
    <GlassCard className="flex flex-col relative overflow-hidden h-[75vh]">
      {/* Glow decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <SectionHeader
        title={<div className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-indigo-300" /> Job Tracking</div>}
        subtitle="Browse and open tailored CV/CL workspaces."
        rightSlot={
          count > 0 ? (
            <span className="glass-chip text-xs bg-indigo-500/20 text-indigo-200 border-indigo-500/30">
              {count} job{count > 1 ? 's' : ''} Tracked
            </span>
          ) : null
        }
      />

      <div className="flex-1 overflow-hidden mt-4">
        {jobsQuery.isLoading ? (
          <div className="flex flex-col items-center justify-center h-full space-y-3 opacity-60">
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
            <p className="text-sm text-slate-300">Loading jobs...</p>
          </div>
        ) : jobsQuery.isError ? (
          <div className="flex items-center justify-center h-full text-red-400">Failed to load jobs.</div>
        ) : count > 0 ? (
          <ul className="space-y-4 overflow-y-auto pr-2 pb-6 max-h-[100%]">
            {jobsQuery.data!.map((job) => (
              <JobListItem key={job._id} job={job} />
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-indigo-500/20 bg-indigo-500/5 px-6 py-12 text-center text-sm text-indigo-300/80">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-indigo-500/40" />
            No jobs tracked yet. Use the form to add your first target position!
          </div>
        )}
      </div>
    </GlassCard>
  );
}
