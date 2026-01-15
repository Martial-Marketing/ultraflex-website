import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Privacy({ auth }: { auth: any }) {
  return (
    <AppLayout auth={auth}>
      <Head title="Privacy Policy" />
      <div className="min-h-screen relative">
        <AnimatedBackground variant="gradient" intensity="medium" className="z-0" />
        <div className="relative z-10 container mx-auto px-6 py-12 text-white">
          <div className="mb-8">
            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight"><span className="ultraflex-ultra text-white">ULTRA</span><span className="ultraflex-flex text-red-600">FLEX</span> Gym Privacy Policy</h1>
            <p className="mt-3 max-w-3xl text-gray-300">Effective Date: April 30th, 2025</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1">
              <nav className="sticky top-24 space-y-2">
                {[
                  { id: 'intro', label: 'Introduction' },
                  { id: 'key-terms', label: 'Key Terms' },
                  { id: 'info-collect', label: 'Information We Collect' },
                  { id: 'how-use', label: 'How We Use Your Info' },
                  { id: 'sharing', label: 'Sharing Your Info' },
                  { id: 'security', label: 'Data Security' },
                  { id: 'rights', label: 'Your Rights' },
                  { id: 'cookies', label: 'Cookies' },
                  { id: 'changes', label: 'Policy Changes' },
                  { id: 'contact', label: 'Contact Us' },
                ].map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="block rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:text-red-600 hover:border-red-700/40 transition">
                    {item.label}
                  </a>
                ))}
              </nav>
            </aside>

            <div className="lg:col-span-3 space-y-6">
              <section id="intro" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
                <p className="text-gray-300">
                  We take your privacy very seriously. Please read this privacy policy carefully as it contains important information on who we are and how and why we collect, store, use, and share your personal information. It also explains your rights in relation to your personal information and how to contact us or supervisory authorities in the event you have a complaint.
                </p>
                <p className="text-gray-300 mt-4">
                  We collect, use, and are responsible for certain personal information about you. When we do so, we are subject to the General Data Protection Regulation, which applies across the European Union (including in the United Kingdom and elsewhere), and we are responsible as the 'controller' of that personal information for the purposes of those laws.
                </p>
              </section>

              <section id="key-terms" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-4">Key Terms</h2>
                <p className="text-gray-300">
                  It would be helpful to start by explaining some key terms used in this policy.
                </p>
              </section>

              <section id="info-collect" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-black text-red-600">1</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3"><span className="text-red-600">Information</span> <span className="text-white">We Collect</span></h2>
                    <p className="text-gray-300 mb-3">We may collect and process the following data about you:</p>
                    <ul className="list-disc pl-6 text-gray-300 space-y-2">
                      <li><strong>Personal Identification Information:</strong> Name, date of birth, gender, and contact details including email address and phone number.</li>
                      <li><strong>Financial Information:</strong> Payment details, billing address, and transaction history.</li>
                      <li><strong>Health and Fitness Information:</strong> Data provided in the Physical Activity Readiness Questionnaire (PARQ), fitness assessments, and related health information.</li>
                      <li><strong>Biometric Data:</strong> Fingerprint data used for gym access systems, stored securely and used solely for authentication purposes.</li>
                      <li><strong>Technical Data:</strong> IP address, browser type, operating system, and information about your use of our website.</li>
                      <li><strong>Usage Data:</strong> Information about how you use our services, including gym attendance and participation in classes or programs.</li>
                      <li><strong>Marketing and Communications Data:</strong> Your preferences in receiving marketing from us and your communication preferences.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="how-use" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-black text-red-600">2</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3"><span className="text-red-600">How We Use</span> <span className="text-white">Your Information</span></h2>
                    <p className="text-gray-300 mb-3">We use the information we collect in the following ways:</p>
                    <ul className="list-disc pl-6 text-gray-300 space-y-2">
                      <li>To provide and manage your membership and our services.</li>
                      <li>To process payments and prevent fraudulent transactions.</li>
                      <li>To communicate with you about your membership, including updates and administrative messages.</li>
                      <li>To personalize your experience and deliver content and product offerings relevant to your interests.</li>
                      <li>To provide secure and efficient access to our facilities using biometric authentication.</li>
                      <li>To comply with legal obligations and enforce our terms and conditions.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="sharing" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-black text-red-600">3</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3"><span className="text-red-600">Sharing</span> <span className="text-white">Your Information</span></h2>
                    <p className="text-gray-300 mb-3">We may share your information with:</p>
                    <ul className="list-disc pl-6 text-gray-300 space-y-2">
                      <li><strong>Service Providers:</strong> Third-party vendors who provide services such as payment processing, data analysis, email delivery, hosting services, and customer service.</li>
                      <li><strong>Affiliated Gyms and Partners:</strong> For the purpose of providing joint services or promotions.</li>
                      <li><strong>Legal Obligations:</strong> When required by law or to respond to legal processes.</li>
                    </ul>
                    <p className="text-gray-300 mt-3">
                      We ensure that any third parties with whom we share your data are obligated to keep your information secure and confidential. Biometric data is not shared with any third parties and is stored securely in accordance with applicable data protection laws.
                    </p>
                  </div>
                </div>
              </section>

              <section id="security" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-black text-red-600">4</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3"><span className="text-red-600">Data</span> <span className="text-white">Security</span></h2>
                    <p className="text-gray-300">
                      We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. This includes secure servers, firewalls, encrypted storage of biometric identifiers, and restricted access protocols.
                    </p>
                  </div>
                </div>
              </section>

              <section id="rights" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-black text-red-600">5</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3"><span className="text-red-600">Your Data Protection</span> <span className="text-white">Rights</span></h2>
                    <p className="text-gray-300 mb-3">Under data protection laws, you have rights including:</p>
                    <ul className="list-disc pl-6 text-gray-300 space-y-2">
                      <li>The right to access the personal data we hold about you.</li>
                      <li>The right to request correction of inaccurate or incomplete data.</li>
                      <li>The right to request deletion of your personal data.</li>
                      <li>The right to object to or restrict processing of your data.</li>
                      <li>The right to data portability.</li>
                    </ul>
                    <p className="text-gray-300 mt-3">
                      To exercise any of these rights, please contact us using the details provided below.
                    </p>
                  </div>
                </div>
              </section>

              <section id="cookies" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-black text-red-600">6</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3"><span className="text-red-600">Cookies</span> <span className="text-white">and Tracking Technologies</span></h2>
                    <p className="text-gray-300">
                      Our website uses cookies to enhance user experience, analyze website traffic, and for marketing purposes. You can set your browser to refuse all or some browser cookies or to alert you when websites set or access cookies.
                    </p>
                  </div>
                </div>
              </section>

              <section id="changes" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-black text-red-600">7</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3"><span className="text-red-600">Changes</span> <span className="text-white">to This Privacy Policy</span></h2>
                    <p className="text-gray-300">
                      We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
                    </p>
                    <p className="text-gray-300 mt-3">
                      <strong>Last updated:</strong> 30/04/2025
                    </p>
                  </div>
                </div>
              </section>

              <section id="contact" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-black text-red-600">8</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3"><span className="text-red-600">Contact</span> <span className="text-white">Us</span></h2>
                    <p className="text-gray-300 mb-3">
                      If you have any questions about this Privacy Policy or our data practices, please contact us at:
                    </p>
                    <div className="text-gray-300 space-y-1">
                      <p><strong>Email:</strong> <a href="mailto:info@ultraflexgym.co.uk" className="text-red-600 underline underline-offset-2">info@ultraflexgym.co.uk</a></p>
                      <p><strong>Address:</strong> 1265 Century Way, Leeds, LS15 8ZB, United Kingdom</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
