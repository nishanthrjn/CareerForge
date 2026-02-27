// apps/frontend/components/ui/SectionHeader.tsx
type SectionHeaderProps = {
  title: React.ReactNode;
  subtitle?: string;
  rightSlot?: React.ReactNode;
};

export function SectionHeader({ title, subtitle, rightSlot }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-2 border-b border-white/10 pb-3">
      <div>
        <h2 className="section-title text-base font-bold text-white tracking-wide">{title}</h2>
        {subtitle && <p className="section-subtitle mt-1 text-slate-300">{subtitle}</p>}
      </div>
      {rightSlot && <div>{rightSlot}</div>}
    </div>
  );
}
