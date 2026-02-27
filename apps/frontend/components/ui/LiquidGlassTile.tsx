// apps/frontend/components/ui/LiquidGlassTile.tsx
import Link from 'next/link';
import { ReactNode } from 'react';

interface LiquidGlassTileProps {
    href: string;
    title: string;
    description: string;
    icon: ReactNode;
    delay?: number;
}

export function LiquidGlassTile({ href, title, description, icon, delay = 0 }: LiquidGlassTileProps) {
    return (
        <Link href={href} className="group relative block w-full outline-none">
            {/* Liquid background effect */}
            <div
                className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-blue-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ animationDelay: `${delay}ms` }}
            />

            {/* Front card */}
            <div className="relative flex h-full flex-col p-6 overflow-hidden rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-white/10 group-hover:border-white/20">

                {/* Subtle top reflection */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-slate-100 shadow-inner ring-1 ring-white/20 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>

                <h3 className="mb-2 text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-200 group-hover:to-purple-200 transition-colors">
                    {title}
                </h3>

                <p className="text-sm text-slate-300/80 group-hover:text-slate-200 transition-colors">
                    {description}
                </p>
            </div>
        </Link>
    );
}
