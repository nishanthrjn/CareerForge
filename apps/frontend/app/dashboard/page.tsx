'use client';

import { useEntityQuery } from '../../hooks/useEntityQuery';
import Link from 'next/link';
import { useState } from 'react';

type JobStatus = 'NEW' | 'IN_PROGRESS' | 'APPLIED' | 'REJECTED' | 'OFFER';

interface Job {
    _id: string;
    title: string;
    company: string;
    location: string;
    status: JobStatus;
    missingSkills?: string[];
    referenceLink?: string;
    createdAt: string;
}

export default function DashboardPage() {
    const { data, isLoading, error } = useEntityQuery<Job[]>(['jobs'], '/jobs?sort=-createdAt');
    const [analyzingMap, setAnalyzingMap] = useState<Record<string, boolean>>({});

    const handleAnalyzeGap = async (jobId: string) => {
        setAnalyzingMap(prev => ({ ...prev, [jobId]: true }));
        try {
            // In a real app we'd fetch the user's profile ID from auth context. Using mock '67123abcd' for now
            const res = await fetch(`http://localhost:3001/api/jobs/${jobId}/gap-analysis?profileId=TEST_PROFILE_ID`);
            if (res.ok) {
                alert('Analysis Complete! Refreshing...');
                window.location.reload();
            }
        } catch (e) {
            alert('Analysis failed');
        } finally {
            setAnalyzingMap(prev => ({ ...prev, [jobId]: false }));
        }
    };

    const renderStatusBadge = (status: JobStatus) => {
        const map: Record<JobStatus, { label: string; color: string }> = {
            NEW: { label: 'New', color: 'bg-blue-100 text-blue-800' },
            IN_PROGRESS: { label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
            APPLIED: { label: 'Applied', color: 'bg-green-100 text-green-800' },
            REJECTED: { label: 'Rejected', color: 'bg-red-100 text-red-800' },
            OFFER: { label: 'Offer', color: 'bg-emerald-100 text-emerald-800' },
        };
        const mapped = map[status] || { label: status, color: 'bg-gray-100 text-gray-800' };
        return (
            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${mapped.color}`}>
                {mapped.label}
            </span>
        );
    };

    if (isLoading) return <div className="p-8 text-center text-gray-500 font-medium animate-pulse">Loading tracker...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error loading jobs.</div>;

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-8 mt-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Job Tracker</h1>
                <div className="flex gap-4">
                    <Link href="/job-search" className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium shadow-sm transition-colors cursor-pointer">
                        Find New Jobs
                    </Link>
                    <Link href="/upload-cv" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors cursor-pointer">
                        Update CV
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                                <th className="px-6 py-4 font-semibold">Company / Role</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Skill Gap</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data?.map((job) => (
                                <tr key={job._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-900">{job.title}</div>
                                        <div className="text-sm text-gray-500">{job.company} • {job.location}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {renderStatusBadge(job.status)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {job.missingSkills && job.missingSkills.length > 0 ? (
                                            <div className="flex flex-wrap gap-1">
                                                {job.missingSkills.map(skill => (
                                                    <span key={skill} className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-xs border border-red-100">
                                                        Missing: {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : job.missingSkills && job.missingSkills.length === 0 ? (
                                            <span className="text-sm text-green-600 font-medium">Perfect Match</span>
                                        ) : (
                                            <button
                                                onClick={() => handleAnalyzeGap(job._id)}
                                                disabled={analyzingMap[job._id]}
                                                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
                                            >
                                                {analyzingMap[job._id] ? 'Analyzing...' : 'Run Gap Analysis'}
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right whitespace-nowrap font-medium">
                                        <Link
                                            href={`/cv-machine/${job._id}`}
                                            className="text-indigo-600 hover:text-indigo-900 mx-2"
                                        >
                                            CV Machine
                                        </Link>
                                        <a
                                            href={job.referenceLink || '#'}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-gray-400 hover:text-gray-600 text-sm"
                                        >
                                            Post ↗
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            {(!data || data.length === 0) && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                        Your tracker is empty. Head to Job Search to find roles!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
