import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Eye, Keyboard, CheckCircle2, Mail } from 'lucide-react';

export default function Accessibility({ auth }: { auth: any }) {
  return (
    <AppLayout auth={auth}>
      <Head title="Accessibility" />
      <div className="min-h-screen relative">
        <AnimatedBackground variant="gradient" intensity="medium" className="z-0" />
        <div className="relative z-10 container mx-auto px-6 py-12 text-white">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
              <CheckCircle2 className="h-3.5 w-3.5 text-red-600" /> Accessibility
            </div>
            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">Accessibility</h1>
            <p className="mt-3 max-w-3xl text-gray-300">ULTRAFLEX is committed to accessibility and inclusive design.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1">
              <nav className="sticky top-24 space-y-2">
                {[
                  { id: 'approach', label: 'Our Approach' },
                  { id: 'feedback', label: 'Feedback' },
                ].map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="block rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:text-red-600 hover:border-red-700/40 transition">
                    {item.label}
                  </a>
                ))}
              </nav>
            </aside>

            <div className="lg:col-span-3 space-y-6">
              <section id="approach" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-red-600" />
                  <h2 className="text-xl font-semibold">Our Approach</h2>
                </div>
                <ul className="mt-4 list-disc pl-6 text-gray-300 space-y-1">
                  <li>Semantic HTML, ARIA where appropriate.</li>
                  <li className="flex items-start gap-2"><Keyboard className="h-4 w-4 mt-1 text-red-600" />Keyboard navigation and focus management.</li>
                  <li>Contrast-aware visual design.</li>
                </ul>
              </section>

              <section id="feedback" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-red-600" />
                  <h2 className="text-xl font-semibold">Feedback</h2>
                </div>
                <p className="mt-4 text-gray-300">If you encounter accessibility barriers, email <a href="mailto:info@ultraflexgym.co.uk" className="text-red-600 underline underline-offset-2">info@ultraflexgym.co.uk</a>.</p>
                <p className="mt-6 text-gray-400 text-sm">Last updated: 28 Nov 2025</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
