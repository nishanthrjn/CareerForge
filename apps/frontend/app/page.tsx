// apps/frontend/app/page.tsx
import { UploadCloud, Briefcase, FileText } from 'lucide-react';
import { LiquidGlassTile } from '../components/ui/LiquidGlassTile';

export default function HomePage() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center gap-12 text-center p-8">
      <div className="space-y-4 relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-400 drop-shadow-sm">
          Careerforge
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-slate-300 mx-auto">
          AI-powered job application automation, CV tailoring, and skill gap analysis to land your next dream role.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl relative z-10">
        <LiquidGlassTile
          href="/upload-cv"
          title="Upload CV Profile"
          description="Extract your core skills and experience using AI to build your base profile."
          icon={<UploadCloud className="w-6 h-6 text-indigo-100" />}
          delay={100}
        />

        <LiquidGlassTile
          href="/jobs"
          title="Job Tracking Dashboard"
          description="View tracked jobs, application status, and initiate automated job searches."
          icon={<Briefcase className="w-6 h-6 text-indigo-100" />}
          delay={200}
        />

        <LiquidGlassTile
          href="/cv-machine"
          title="CV & CL Machine"
          description="Global view of all generated cover letters and tailored CV components."
          icon={<FileText className="w-6 h-6 text-indigo-100" />}
          delay={300}
        />
      </div>

      {/* Ambient background glows */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none -z-10" />
      <div className="fixed top-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none -z-10" />
    </main>
  );
}

