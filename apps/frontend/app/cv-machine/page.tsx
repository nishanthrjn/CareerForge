// apps/frontend/app/cv-machine/page.tsx
'use client';

import { useJobApplications } from '../../hooks/useJobApplications';
import { GlassCard } from '../../components/ui/GlassCard';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { FileText, Cpu, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function CvMachinePage() {
    const { jobsQuery } = useJobApplications();
    const count = jobsQuery.data?.length ?? 0;

    return (
        <div className="max-w-7xl mx-auto space-y-6 relative p-6">
            {/* Decorative Glows */}
            <div className="absolute top-0 right-1/4 w-[30vw] h-[30vw] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-1/4 w-[30vw] h-[30vw] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="glass-card p-8 text-center relative overflow-hidden group">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-500" />
                <Cpu className="w-16 h-16 mx-auto mb-4 text-indigo-400 group-hover:scale-110 transition-transform duration-500" />
                <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                    CV & Cover Letter Machine
                </h1>
                <p className="max-w-2xl mx-auto text-slate-300 text-sm md:text-base">
                    Select any bounded job context below to enter the generator workspace. AI will automatically
                    weigh your baseline profile against the target role requirements.
                </p>
            </div>

            <GlassCard className="p-6 md:p-8 min-h-[40vh]">
                <SectionHeader
                    title={<div className="flex items-center gap-2"><FileText className="w-5 h-5 text-indigo-300" /> Select Workspace</div>}
                    subtitle="Choose a tracked position to tailor documents."
                />

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobsQuery.isLoading ? (
                        <div className="col-span-full flex justify-center p-12">
                            <Loader2 className="w-10 h-10 animate-spin text-indigo-500/50" />
                        </div>
                    ) : count > 0 ? (
                        jobsQuery.data!.map(job => (
                            <Link
                                key={job._id}
                                href={`/jobs/${job._id}`}
                                className="group relative flex flex-col justify-between p-6 rounded-3xl bg-slate-900/50 border border-white/5 hover:bg-white/5 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10"
                            >
                                <div className="space-y-2 mb-6">
                                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">{job.title}</h3>
                                    <p className="text-sm text-slate-400 font-medium">{job.company}</p>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <span className="text-xs font-semibold text-slate-500 group-hover:text-indigo-200 uppercase tracking-widest transition-colors">
                                        Launch Engine
                                    </span>
                                    <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-indigo-300 group-hover:translate-x-1 transition-all" />
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center p-12 rounded-3xl border border-dashed border-indigo-500/20 bg-indigo-500/5">
                            <p className="text-indigo-300 font-medium">No active job workspaces found.</p>
                            <Link href="/jobs" className="text-sm text-indigo-400 hover:text-indigo-300 underline mt-2 inline-block">Head to Job Tracking to add one.</Link>
                        </div>
                    )}
                </div>
            </GlassCard>
        </div>
    );
}
