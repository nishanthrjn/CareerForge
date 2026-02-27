'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, CheckCircle2, FileText, Loader2 } from 'lucide-react';

export default function UploadCvPage() {
    const [isUploading, setIsUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setSuccessMessage('');
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api'}/cv/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload & Extraction failed');

            const data = await res.json();
            setSuccessMessage('CV Parsed Successfully! Redirecting to dashboard...');
            setTimeout(() => {
                router.push('/jobs');
            }, 2000);
        } catch (err: any) {
            alert('Failed to extract CV: ' + err.message);
            setIsUploading(false);
        }
    };

    return (
        <div className="flex h-[80vh] w-[100vw] items-center justify-center p-6 relative">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 drop-shadow-sm tracking-tight mb-4">
                        Upload Your Baseline CV
                    </h1>
                    <p className="text-slate-300 max-w-lg mx-auto text-sm md:text-base">
                        Our AI extractor reads your existing PDF resume and creates a structured
                        profile. This profile bounds all future AI generations to your real experience.
                    </p>
                </div>

                <div className="relative glass-card bg-slate-900/40 p-12 text-center rounded-[32px] overflow-hidden group transition-transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10">
                    {/* Glow effect */}
                    <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
                    <div className="absolute inset-y-0 -left-px w-px bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />

                    {isUploading ? (
                        <div className="py-12 flex flex-col items-center justify-center space-y-6">
                            <Loader2 className="w-16 h-16 text-indigo-400 animate-spin" />
                            <div className="space-y-2">
                                <p className="text-xl font-medium text-slate-200">AI is reading your document...</p>
                                <p className="text-sm text-slate-400">Extracting skills, parsing jobs, and learning about you.</p>
                            </div>
                        </div>
                    ) : successMessage ? (
                        <div className="py-12 flex flex-col items-center justify-center space-y-6">
                            <CheckCircle2 className="w-16 h-16 text-emerald-400" />
                            <p className="text-xl font-medium text-emerald-300">{successMessage}</p>
                        </div>
                    ) : (
                        <div className="relative cursor-pointer py-8">
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={handleUpload}
                                disabled={isUploading}
                                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer disabled:cursor-not-allowed"
                            />
                            <div className="flex flex-col items-center gap-6 pointer-events-none">
                                <div className="w-24 h-24 rounded-full bg-indigo-500/20 flex items-center justify-center ring-1 ring-indigo-500/30 group-hover:scale-110 group-hover:bg-indigo-500/30 transition-all duration-300">
                                    <FileText className="w-10 h-10 text-indigo-200" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-lg font-semibold text-slate-100">Click or drag PDF to upload</p>
                                    <p className="text-sm text-slate-400">PDF files only (Max 5MB)</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Ambient background glows */}
            <div className="fixed top-20 right-20 w-[30vw] h-[30vw] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none -z-10" />
        </div>
    );
}
