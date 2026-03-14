interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ title, subtitle, align = 'center' }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-heading">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>}
      <div className={`mt-4 h-1 w-20 bg-accent-400 rounded-full ${align === 'center' ? 'mx-auto' : ''}`} />
    </div>
  );
}
