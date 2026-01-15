import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { FileText, ShieldAlert, Scale, LinkIcon, ExternalLink } from 'lucide-react';

export default function Terms({ auth }: { auth: any }) {
  const toc = [
    { id: 'pdf-document', label: 'Full Terms Document' },
    { id: 'memberships', label: 'Memberships' },
    { id: 'acceptable-use', label: 'Acceptable Use' },
    { id: 'liability', label: 'Liability' },
    { id: 'links', label: 'Links to Third Parties' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <AppLayout auth={auth}>
      <Head title="Terms & Conditions" />
      <div className="min-h-screen relative">
        <AnimatedBackground variant="gradient" intensity="medium" className="z-0" />
        <div className="relative z-10 container mx-auto px-6 py-12 text-white">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
              <FileText className="h-3.5 w-3.5 text-red-600" /> Terms
            </div>
            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">Terms & Conditions</h1>
            <p className="mt-3 max-w-3xl text-gray-300">These terms govern use of the ULTRAFLEX website and services.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar TOC */}
            <aside className="lg:col-span-1">
              <nav className="sticky top-24 space-y-2">
                {toc.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="block rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:text-red-600 hover:border-red-700/40 transition">
                    {item.label}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-3 space-y-6">
              <section id="pdf-document" className="rounded-2xl border border-red-700/30 bg-red-900/10 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-red-600" />
                  <h2 className="text-xl font-semibold">Full Membership Terms & Conditions</h2>
                </div>
                <p className="mt-4 text-gray-300 mb-4">
                  For the complete and official ULTRAFLEX Gym membership terms and conditions, including all detailed provisions, please review our comprehensive PDF document.
                </p>
                <a 
                  href="https://ultraflexgym.co.uk/wp-content/uploads/2025/01/Jan-2025-Ultraflex-Updated-Membership-Form-and-Terms-.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open Full Terms & Conditions (PDF)
                </a>
              </section>

              <section id="memberships" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Scale className="h-5 w-5 text-red-600" />
                  <h2 className="text-xl font-semibold">Memberships</h2>
                </div>
                <p className="mt-4 text-gray-300">Memberships are administered via Ashbourne. Their terms apply to sign-ups, payments, freezes, and cancellations. Please refer to the full PDF document for complete membership terms.</p>
              </section>

              <section id="acceptable-use" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="h-5 w-5 text-red-600" />
                  <h2 className="text-xl font-semibold">Acceptable Use</h2>
                </div>
                <ul className="mt-4 list-disc pl-6 text-gray-300 space-y-1">
                  <li>Do not misuse the site or attempt to bypass security.</li>
                  <li>Respect intellectual property and content guidelines.</li>
                  <li>Do not engage in unlawful or harmful activity using our services.</li>
                </ul>
              </section>

              <section id="liability" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Scale className="h-5 w-5 text-red-600" />
                  <h2 className="text-xl font-semibold">Liability</h2>
                </div>
                <p className="mt-4 text-gray-300">We provide content “as is.” To the extent permitted by law, we disclaim warranties regarding availability and fitness for a particular purpose.</p>
              </section>

              <section id="links" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <LinkIcon className="h-5 w-5 text-red-600" />
                  <h2 className="text-xl font-semibold">Links to Third Parties</h2>
                </div>
                <p className="mt-4 text-gray-300">Our website may contain links to external sites. We are not responsible for the content or privacy practices of those sites. Please review their policies when you visit.</p>
              </section>

              <section id="contact" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-red-600" />
                  <h2 className="text-xl font-semibold">Contact</h2>
                </div>
                <p className="mt-4 text-gray-300">Questions: <a href="mailto:info@ultraflexgym.co.uk" className="text-red-600 underline underline-offset-2">info@ultraflexgym.co.uk</a>.</p>
                <p className="mt-6 text-gray-400 text-sm">Last updated: January 2025</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
