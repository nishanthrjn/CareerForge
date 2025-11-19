// LaTeX snippets view with copy buttons
// apps/frontend/app/jobs/[id]/latex/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useJobDetail } from '../../../../hooks/useJobDetail';
import { useEffect } from 'react';

export default function LatexSnippetsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const { jobQuery, latexSnippetsQuery } = useJobDetail(id);

  useEffect(() => {
    latexSnippetsQuery.refetch();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (jobQuery.isLoading || latexSnippetsQuery.isLoading)
    return <p>Loading...</p>;
  if (jobQuery.isError || !jobQuery.data)
    return <p className="text-red-600">Failed to load job</p>;
  if (latexSnippetsQuery.isError || !latexSnippetsQuery.data)
    return <p className="text-red-600">Failed to load LaTeX snippets</p>;

  const snippets = latexSnippetsQuery.data;

  const sections = [
    {
      label: 'ccSummary.tex (CV Summary)',
      key: 'ccSummary' as const,
      hint: 'Paste into ccSummary.tex in Overleaf',
    },
    {
      label: 'ccSkills.tex (CV Skills)',
      key: 'ccSkills' as const,
      hint: 'Paste into ccSkills.tex in Overleaf',
    },
    {
      label: 'ccExperience.tex (CV Experience)',
      key: 'ccExperience' as const,
      hint: 'Paste into ccExperience.tex in Overleaf',
    },
    {
      label: 'cover_data.tex (Cover Letter Data)',
      key: 'coverData' as const,
      hint: 'Paste into cover_data.tex in Overleaf',
    },
  ];

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => router.back()}
        className="text-xs text-slate-600 hover:underline"
      >
        ← Back to job
      </button>

      <h2 className="text-lg font-semibold">
        LaTeX Snippets for {jobQuery.data.title} @ {jobQuery.data.company}
      </h2>

      <div className="space-y-4">
        {sections.map((s) => (
          <section
            key={s.key}
            className="rounded-xl border bg-white p-4 shadow-sm"
          >
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">{s.label}</h3>
                <p className="text-xs text-slate-600">{s.hint}</p>
              </div>
              <button
                type="button"
                onClick={() => copy(snippets[s.key])}
                className="rounded border px-3 py-1 text-xs hover:bg-slate-50"
              >
                Copy
              </button>
            </div>
            <pre className="max-h-80 overflow-auto rounded bg-slate-900 p-3 text-xs text-slate-100">
              <code>{snippets[s.key]}</code>
            </pre>
          </section>
        ))}
      </div>
    </div>
  );
}
