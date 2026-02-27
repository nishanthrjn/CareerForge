// apps/frontend/components/jobs/JobListItem.tsx
'use client';

import Link from 'next/link';
import { JobApplication } from '../../lib/types';
import { StatusPill } from '../ui/StatusPill';
import { Building2, MapPin, ExternalLink, ChevronRight } from 'lucide-react';

type Props = {
  job: JobApplication;
};

export function JobListItem({ job }: Props) {
  return (
    <li className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-100/90 transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-lg hover:shadow-indigo-500/10">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
            {job.title}
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {job.company}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
          </div>
        </div>
        <StatusPill value={job.status} />
      </div>

      <p className="mt-3 line-clamp-2 text-xs text-slate-300/80 leading-relaxed">
        {job.jobDescription}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        {job.referenceLink ? (
          <a
            href={job.referenceLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-indigo-300/80 hover:text-indigo-200"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Original Ad
          </a>
        ) : (
          <span />
        )}
        <Link
          href={`/jobs/${job._id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-indigo-500/20 px-3 py-1.5 rounded-full hover:bg-indigo-500/40 transition-colors"
        >
          Open Workspace <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </li>
  );
}
