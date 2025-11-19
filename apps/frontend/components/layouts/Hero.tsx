// apps/frontend/components/layouts/Hero.tsx
import { ReactNode } from 'react';

type HeroProps = {
  title: string;
  subtitle: string;
  rightSlot?: ReactNode;
};

export function Hero({ title, subtitle, rightSlot }: HeroProps) {
  return (
    <header className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-slate-50 md:text-3xl">
          {title}
        </h1>
        <p className="mt-1 max-w-2xl text-xs text-slate-300 md:text-sm">
          {subtitle}
        </p>
      </div>
      {rightSlot && <div>{rightSlot}</div>}
    </header>
  );
}
