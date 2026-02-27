'use client';

import { useState } from 'react';

export default function JobSearchPage() {
    const [keywords, setKeywords] = useState('');
    const [countries, setCountries] = useState('Germany, UK');
    const [roles, setRoles] = useState('Software Engineer, Frontend Developer');
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState<Record<number, boolean>>({});

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setResults([]);

        try {
            const qs = new URLSearchParams({ keywords, countries, roles }).toString();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api'}/job-search?${qs}`);
            const data = await res.json();
            if (data.success) {
                setResults(data.data);
            }
        } catch (error) {
            alert('Error searching jobs');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveJob = async (job: any, index: number) => {
        setIsSaving(prev => ({ ...prev, [index]: true }));
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api'}/job-search/save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(job),
            });
            if (res.ok) {
                alert('Job saved to tracker!');
            }
        } catch (e) {
            alert('Failed to save job');
        } finally {
            setIsSaving(prev => ({ ...prev, [index]: false }));
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 mt-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">AI Job Aggregator</h1>

            <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                        value={keywords}
                        onChange={e => setKeywords(e.target.value)}
                        placeholder="e.g. React, Node, AI"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Locations</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                        value={countries}
                        onChange={e => setCountries(e.target.value)}
                        placeholder="e.g. Remote, UK"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Roles</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                        value={roles}
                        onChange={e => setRoles(e.target.value)}
                        placeholder="e.g. Frontend Engineer"
                    />
                </div>
                <div className="flex items-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </form>

            <div className="space-y-4">
                {results.map((job, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                            <p className="text-gray-600 mb-2">{job.company} • {job.location}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {job.requiredSkills.map((skill: string) => (
                                    <span key={skill} className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-2">{job.jobDescription}</p>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[120px]">
                            <button
                                onClick={() => handleSaveJob(job, idx)}
                                disabled={isSaving[idx]}
                                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center shadow-sm disabled:opacity-50"
                            >
                                {isSaving[idx] ? 'Saving...' : 'Save Job'}
                            </button>
                            <a
                                href={job.referenceLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium text-center"
                            >
                                View Original
                            </a>
                        </div>
                    </div>
                ))}
                {!isLoading && results.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No jobs found. Try adjusting your search criteria.
                    </div>
                )}
            </div>
        </div>
    );
}
