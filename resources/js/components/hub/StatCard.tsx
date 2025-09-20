interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  tone?: 'red' | 'green' | 'purple' | 'orange';
}

export default function StatCard({ title, value, subtitle, tone = 'red' }: StatCardProps) {
  return (
    <div className={`p-5 rounded-lg bg-black/40 border border-white/10 hover:border-white/20 transition-colors`}>      
      <div className={`w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/90 text-sm font-semibold mb-3`}>
        {title[0]}
      </div>
      <div className="text-white text-2xl font-bold">{value}</div>
      {subtitle && <div className="text-gray-400 text-sm mt-1">{subtitle}</div>}
    </div>
  );
}
