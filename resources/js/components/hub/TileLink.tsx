import { Link } from '@inertiajs/react';

interface TileLinkProps {
  title: string;
  description?: string;
  href: string;
  // tone is accepted but ignored to keep a neutral style
  tone?: 'red' | 'green' | 'purple' | 'orange';
}

export default function TileLink({ title, description, href }: TileLinkProps) {
  return (
    <Link href={href} className="block group">
      <div className="p-5 rounded-lg bg-black/40 border border-white/10 hover:border-white/20 transition-colors">
        <div className={"w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center text-lg font-bold mb-4 group-hover:scale-105 transition-transform"}>
          {title[0]}
        </div>
        <div className="text-white font-semibold text-lg group-hover:text-white transition-colors">{title}</div>
        {description && <div className="text-gray-300 text-sm mt-1">{description}</div>}
      </div>
    </Link>
  );
}
