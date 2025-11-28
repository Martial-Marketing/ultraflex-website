import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { ShieldCheck, Info, Database, UserCheck, Mail } from 'lucide-react';

export default function Privacy({ auth }: { auth: any }) {
  return (
    <AppLayout auth={auth}>
      <Head title="Privacy Policy" />
      <div className="min-h-screen relative">
        <AnimatedBackground variant="gradient" intensity="medium" className="z-0" />
        <div className="relative z-10 container mx-auto px-6 py-12 text-white">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
              <ShieldCheck className="h-3.5 w-3.5 text-red-600" /> Privacy
            </div>
            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
            <p className="mt-3 max-w-3xl text-gray-300">UltraFlex respects your privacy. This policy explains how we collect, use, and protect your information.</p>
          </div>

          {/* Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* TOC */}
            <aside className="lg:col-span-1">
              <nav className="sticky top-24 space-y-2">
                {[
                  { id: 'collect', label: 'Information We Collect' },
                  { id: 'use', label: 'How We Use Info' },
                  { id: 'sharing', label: 'Data Sharing' },
                  { id: 'rights', label: 'Your Rights' },
                ].map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="block rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:text-red-600 hover:border-red-700/40 transition">
                    {item.label}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3 space-y-6">
              <section id="collect" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-red-600" />
                  <h2 className="text-xl font-semibold">Information We Collect</h2>
                </div>
                <ul className="mt-4 list-disc pl-6 text-gray-300 space-y-1">
                  <li>Account data: name, email, optional profile details.</li>
                  <li>Membership data: plan selections processed via Ashbourne.</li>
                  <li>Usage data: pages visited, actions taken on our site.</li>
                  <li>Contact data: messages sent via contact forms.</li>
                </ul>
              </section>

              <section id="use" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Info className="h-5 w-5 text-red-600" />
                  <h2 className="text-xl font-semibold">How We Use Information</h2>
                </div>
                <ul className="mt-4 list-disc pl-6 text-gray-300 space-y-1">
                  <li>Provide and improve the website and member services.</li>
                  <li>Respond to enquiries and support requests.</li>
                  <li>Security, fraud prevention, and legal compliance.</li>
                </ul>
              </section>

              <section id="sharing" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <UserCheck className="h-5 w-5 text-red-600" />
                  <h2 className="text-xl font-semibold">Data Sharing</h2>
                </div>
                <p className="mt-4 text-gray-300">We may share data with service providers (e.g., Ashbourne for membership processing) under agreements that protect your information. We do not sell personal data.</p>
              </section>

              <section id="rights" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-red-600" />
                  <h2 className="text-xl font-semibold">Your Rights</h2>
                </div>
                <ul className="mt-4 list-disc pl-6 text-gray-300 space-y-1">
                  <li>Access, rectify, or delete your data (subject to legal requirements).</li>
                  <li>Object to or restrict certain processing.</li>
                  <li>Contact us at <a href="mailto:info@ufg" className="text-red-600 underline underline-offset-2">info@ufg</a>.</li>
                </ul>
                <p className="mt-6 text-gray-400 text-sm">Last updated: 28 Nov 2025</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
