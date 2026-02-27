'use client';

import { useEntityQuery } from '../../../hooks/useEntityQuery';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function CvMachinePage() {
    const { id } = useParams() as { id: string };
    const { data: job, isLoading } = useEntityQuery<any>(['jobs', id], `/jobs/${id}`);

    const [sections, setSections] = useState({
        summary: '',
        skills: '',
        experience: '',
        coverLetter: ''
    });

    const [isGenerating, setIsGenerating] = useState<Record<string, boolean>>({});
    const [instructions, setInstructions] = useState<Record<string, string>>({});
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (job?.tailoredSections) {
            setSections({
                summary: job.tailoredSections.summary || '',
                skills: job.tailoredSections.skills || '',
                experience: job.tailoredSections.experience || '',
                coverLetter: job.tailoredSections.coverLetter || ''
            });
        }
    }, [job]);

    const handleGenerate = async (sectionType: string) => {
        setIsGenerating(prev => ({ ...prev, [sectionType]: true }));
        try {
            const instr = instructions[sectionType];
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api'}/jobs/${id}/ai-draft?sectionType=${sectionType}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ instructions: instr }),
            });
            const data = await res.json();
            if (res.ok) {
                setSections(prev => ({ ...prev, [sectionType]: data.data.job.tailoredSections[sectionType] }));
                alert(`Draft updated by ${data.data.providerUsed}`);
            }
        } catch (e) {
            alert('Generation failed');
        } finally {
            setIsGenerating(prev => ({ ...prev, [sectionType]: false }));
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api'}/jobs/${id}/tailored`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sections)
            });
            if (res.ok) {
                alert('Saved successfully!');
                router.push('/dashboard');
            }
        } catch (e) {
            alert('Save failed');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="p-8 text-center animate-pulse">Loading CV Machine...</div>;
    if (!job) return <div className="p-8 text-center text-red-500">Job not found</div>;

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-8 mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT COLUMN: Job Context */}
            <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{job.title}</h2>
                    <h3 className="text-lg text-indigo-600 font-medium mb-4">{job.company} • {job.location}</h3>

                    <div className="h-64 overflow-y-auto pr-2 text-sm text-gray-600 border border-gray-100 rounded-lg p-4 bg-gray-50 mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2 uppercase text-xs tracking-wider">Job Description</h4>
                        <div className="whitespace-pre-wrap">{job.jobDescription}</div>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                        <h4 className="font-semibold text-gray-900 mb-3 uppercase text-xs tracking-wider">Skill Gap Analysis</h4>
                        {job.missingSkills?.length ? (
                            <div className="flex flex-wrap gap-2">
                                {job.missingSkills.map((s: string) => (
                                    <span key={s} className="bg-red-50 text-red-700 font-medium px-2 py-1 rounded text-xs border border-red-100">
                                        Missing: {s}
                                    </span>
                                ))}
                            </div>
                        ) : <span className="text-sm text-green-600">Great Match!</span>}
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Editors */}
            <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h1 className="text-xl font-bold text-gray-900">Tailoring Machine</h1>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save & Publish'}
                    </button>
                </div>

                {['summary', 'skills', 'experience', 'coverLetter'].map((sec) => (
                    <div key={sec} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900 capitalize">{sec.replace(/([A-Z])/g, ' $1').trim()}</h3>
                            <div className="flex gap-2 w-1/2">
                                <input
                                    type="text"
                                    placeholder="Instructions (e.g. Make it more aggressive)"
                                    className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500"
                                    value={instructions[sec] || ''}
                                    onChange={(e) => setInstructions(prev => ({ ...prev, [sec]: e.target.value }))}
                                />
                                <button
                                    onClick={() => handleGenerate(sec)}
                                    disabled={isGenerating[sec]}
                                    className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap disabled:opacity-50"
                                >
                                    {isGenerating[sec] ? 'Drafting...' : 'AI Draft'}
                                </button>
                            </div>
                        </div>
                        <textarea
                            className="w-full h-40 border border-gray-200 rounded-lg p-4 font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                            value={sections[sec as keyof typeof sections]}
                            onChange={(e) => setSections(prev => ({ ...prev, [sec]: e.target.value }))}
                            placeholder={`Write or generate your ${sec}...`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
