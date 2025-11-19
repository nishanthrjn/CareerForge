import './globals.css';
import { ReactNode } from 'react';
import { QueryProvider } from './query-provider';

export const metadata = {
  title: 'CV & Cover Letter Tailor',
  description:
    'Tailor your CV and cover letters using AI and LaTeX snippets for Overleaf.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 md:px-8 md:py-10">
            {/* Top header */}
            <header className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-50 md:text-3xl">
                  CV &amp; Cover Letter Tailor
                </h1>
                <p className="mt-1 max-w-2xl text-xs text-slate-300 md:text-sm">
                  Manage job applications, tailor CV sections with AI, and
                  export LaTeX snippets for your Overleaf workflows.
                </p>
              </div>
              <div className="glass-chip">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                <span>Connected to local API</span>
              </div>
            </header>

            <main className="flex-1 pb-6 md:pb-10">{children}</main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
