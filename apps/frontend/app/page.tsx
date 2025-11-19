// apps/frontend/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">
          CV &amp; Cover Letter Tailor
        </h1>
        <p className="mt-2 max-w-xl text-sm text-slate-600">
          Manage job applications, tailor CV sections and cover letters with AI,
          and export LaTeX snippets for your Overleaf CV &amp; cover letter
          templates.
        </p>
      </div>

      <Link
        href="/jobs"
        className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Go to Job Applications
      </Link>
    </main>
  );
}
