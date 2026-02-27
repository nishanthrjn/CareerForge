// apps/frontend/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { QueryProvider } from './query-provider';
import { AppShell } from '../components/layouts/AppShell';
import { Hero } from '../components/layouts/Hero';
import { ThemeProvider } from './theme-provider';
import { ThemeToggle } from '../components/ui/ThemeToggle';



export const metadata = {
  title: 'CV & Cover Letter Tailor',
  description:
    'Tailor your CV and cover letters using AI and LaTeX snippets for Overleaf.',
};

function ConnectionBadge() {
  return (
    <div className="glass-chip">
      <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
      <span>Connected to local API</span>
    </div>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AppShell>
              <Hero
                title="CV & Cover Letter Tailor"
                subtitle="Manage job applications, tailor CV sections with AI, and export LaTeX snippets for your Overleaf workflows."
                rightSlot={
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <ConnectionBadge />
                  </div>
                }
              />
              <main className="flex-1 pb-6 md:pb-10">{children}</main>
            </AppShell>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
