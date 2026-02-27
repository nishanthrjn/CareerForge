'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function UploadCvPage() {
    const [isUploading, setIsUploading] = cvUploadState();
    const router = useRouter();

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('http://localhost:3001/api/cv/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            // On success, redirect to dashboard or show success message
            alert('CV Parsed Successfully! Summary: ' + data.data.summary);
            router.push('/');
        } catch (err: any) {
            alert('Failed to extract CV: ' + err.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8 mt-10 bg-white rounded-xl shadow-md border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                Upload Your CV
            </h1>
            <p className="text-gray-500 mb-8">
                We'll use our AI extractor to automatically pull your skills, experience, and education into your profile framework.
            </p>

            <div className="relative border-2 border-dashed border-indigo-200 rounded-xl p-12 text-center hover:bg-indigo-50/50 transition-colors cursor-pointer group">
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleUpload}
                    disabled={isUploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                <div className="space-y-4">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                        <svg
                            className="w-8 h-8 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                        </svg>
                    </div>
                    <div className="text-lg font-medium text-gray-700">
                        {isUploading ? 'Extracting via AI...' : 'Click or drag PDF to upload'}
                    </div>
                    <p className="text-sm text-gray-500">PDF files only, max 5MB</p>
                </div>
            </div>
        </div>
    );
}

function cvUploadState() {
    return useState(false);
}
