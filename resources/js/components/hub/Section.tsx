import { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';

interface SectionProps {
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
  className?: string;
}

export default function Section({ title, subtitle, action, className, children }: PropsWithChildren<SectionProps>) {
  return (
    <section className={`py-10 ${className ?? ''}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
            {subtitle && <p className="text-gray-300 mt-1">{subtitle}</p>}
          </div>
          {action && (
            <Link href={action.href} className="self-start sm:self-auto">
              <span className="inline-block text-sm text-white/90 hover:text-white border border-white/20 hover:border-white/40 rounded-md px-3 py-1.5 backdrop-blur-sm bg-white/10 transition-colors">
                {action.label}
              </span>
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
