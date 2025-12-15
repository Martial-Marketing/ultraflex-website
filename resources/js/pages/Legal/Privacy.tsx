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
            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
            <p className="mt-3 max-w-3xl text-gray-300">This Privacy Policy mirrors the current policy on ultraflexclothing.com.</p>
          </div>

          {/* Sidebar + Content layout for better navigation */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1">
              <nav className="sticky top-24 space-y-2">
                {[
                  { id: 'intro', label: 'Introduction' },
                  { id: 'pii', label: 'Personal Information' },
                  { id: 'collected', label: 'Info Collected' },
                  { id: 'orgs', label: 'Collecting Orgs' },
                  { id: 'usage', label: 'How We Use' },
                  { id: 'sharing', label: 'Sharing' },
                  { id: 'storage', label: 'Storage' },
                  { id: 'choices', label: 'Your Choices' },
                  { id: 'cookies', label: 'Cookies' },
                  { id: 'login', label: 'Login Info' },
                  { id: 'partners', label: 'Partners' },
                  { id: 'security', label: 'Security' },
                  { id: 'accuracy', label: 'Accuracy' },
                  { id: 'deletion', label: 'Deletion' },
                  { id: 'rights', label: 'Your Rights' },
                  { id: 'changes', label: 'Policy Changes' },
                  { id: 'links', label: 'Links' },
                ].map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="block rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:text-red-600 hover:border-red-700/40 transition">
                    {item.label}
                  </a>
                ))}
              </nav>
            </aside>

            <div className="lg:col-span-3 space-y-6">
              <section id="intro" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-gray-300">
                Welcome to www.ultraflexclothing.com (the “Site”). We understand that privacy online is important to users of our Site,
                especially when conducting business. This statement governs our privacy policies with respect to those
                users of the Site (“Visitors”) who visit without transacting business and Visitors who register to
                transact business on the Site and make use of the various services offered by Ultraflex Gym Clothing LTD t/a Ultraflex Clothing
                (collectively, “Services”) (“Authorized Customers”).
              </p>
            </section>

            <section id="pii" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-3">“Personally Identifiable Information”</h2>
              <p className="text-gray-300">
                Refers to any information that identifies or can be used to identify, contact, or locate the person to
                whom such information pertains, including, but not limited to, name, address, phone number, fax number,
                email address, financial profiles, social security number, and credit card information. Personally
                Identifiable Information does not include information that is collected anonymously (that is, without
                identification of the individual user) or demographic information not connected to an identified
                individual.
              </p>
            </section>

            <section id="collected" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-3">What Personally Identifiable Information is collected?</h2>
              <p className="text-gray-300">We may collect basic user profile information from all of our Visitors.</p>
              <p className="text-gray-300 mt-2">
                We collect the following additional information from our Authorized Customers: the names, addresses,
                phone numbers and email addresses of Authorized Customers, the nature and size of the business, and
                the nature and size of the advertising inventory that the Authorized Customer intends to purchase or
                sell.
              </p>
            </section>

            <section id="orgs" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-3">What organizations are collecting the information?</h2>
              <p className="text-gray-300">
                In addition to our direct collection of information, our third party service vendors (such as credit
                card companies, clearinghouses and banks) who may provide such services as credit, insurance, and
                escrow services may collect this information from our Visitors and Authorized Customers.
                We do not control how these third parties use such information, but we do ask them to disclose how
                they use personal information provided to them from Visitors and Authorized Customers. Some of
                these third parties may be intermediaries that act solely as links in the distribution chain,
                and do not store, retain, or use the information given to them.
              </p>
            </section>

            <section id="usage" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-3">How does the Site use Personally Identifiable Information?</h2>
              <p className="text-gray-300">
                We use Personally Identifiable Information to customize the Site, to make appropriate service
                offerings, and to fulfill buying and selling requests on the Site. We may email Visitors and
                Authorized Customers about research or purchase and selling opportunities on the Site or information
                related to the subject matter of the Site. We may also use Personally Identifiable Information to
                contact Visitors and Authorized Customers in response to specific inquiries, or to provide requested
                information.
              </p>
            </section>

            <section id="sharing" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-3">With whom may the information may be shared?</h2>
              <p className="text-gray-300">
                Personally Identifiable Information about Authorized Customers may be shared with other Authorized
                Customers who wish to evaluate potential transactions with other Authorized Customers.
                We may share aggregated information about our Visitors, including the demographics of our
                Visitors and Authorized Customers, with our affiliated agencies and third party vendors.
                We also offer the opportunity to “opt out” of receiving information or being contacted by
                us or by any agency acting on our behalf.
              </p>
            </section>

            <section id="storage" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-3">How is Personally identifiable Information stored?</h2>
              <p className="text-gray-300">
                Personally Identifiable Information collected by
                Ultraflex Gym Clothing LTD t/a Ultraflex Clothing is securely stored and is not accessible to third parties or employees of
                Ultraflex Gym Clothing LTD t/a Ultraflex Clothing except for use as indicated above.
              </p>
            </section>

            <section id="choices" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-3">What choices are available to Visitors regarding collection, use and distribution of the information?</h2>
              <p className="text-gray-300">
                Visitors and Authorized Customers may opt out of receiving unsolicited information from or being contacted by us and/or our vendors and affiliated agencies by responding to emails as instructed, or by contacting us at Ultraflex gym clothing LTD 1285 Century Way, LS15 8ZB
              </p>
            </section>

            <section id="cookies" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-3">Cookies</h2>
              <p className="text-gray-300">
                A cookie is a string of information that a website stores on a visitor’s computer, and that the visitor’s browser provides to the website each time the visitor returns.
              </p>
              <h3 className="text-lg font-semibold mt-4">Are Cookies Used on the Site?</h3>
              <p className="text-gray-300 mt-2">
                Cookies are used for a variety of reasons. We use Cookies to obtain information about the preferences of our Visitors and the services they select. We also use Cookies for security purposes to protect our Authorized Customers. For example, if an Authorized Customer is logged on and the site is unused for more than 10 minutes, we will automatically log the Authorized Customer off. Visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using www.ultraflexclothing.com, with the drawback that certain features of website may not function properly without the aid of cookies.
              </p>
              <h3 className="text-lg font-semibold mt-4">Cookies used by our service providers</h3>
              <p className="text-gray-300 mt-2">
                Our service providers use cookies and those cookies may be stored on your computer when you visit our website. You can find more details about which cookies are used in our cookies info page.
              </p>
            </section>

            <section id="login" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-3">How does Athletic Club LTD t/a Ultra Flex Gym use login information?</h2>
              <p className="text-gray-300">
                Ultraflex Clothing LTD uses login information, including, but not limited to, IP addresses, ISPs, and browser types, to analyze trends, administer the Site, track a user’s movement and use, and gather broad demographic information.
              </p>
            </section>

            <section id="partners" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-3">What partners or service providers have access to Personally Identifiable Information from Visitors and/or Authorized Customers on the Site?</h2>
              <p className="text-gray-300">
                Ultra Flex Clothing LTD has entered into and will continue to enter into partnerships and other affiliations with a number of vendors. Such vendors may have access to certain Personally Identifiable Information on a need to know the basis for evaluating Authorized Customers for service eligibility. Our privacy policy does not cover their collection or use of this information. Disclosure of Personally Identifiable Information to comply with the law. We will disclose Personally Identifiable Information in order to comply with a court order or subpoena or a request from a law enforcement agency to release information. We will also disclose Personally Identifiable Information when reasonably necessary to protect the safety of our Visitors and Authorized Customers.
              </p>
            </section>

            <section id="security" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-3">How does the Site keep Personally Identifiable Information secure?</h2>
              <p className="text-gray-300">
                All of our employees are familiar with our security policy and practices. The Personally Identifiable Information of our Visitors and Authorized Customers is only accessible to a limited number of qualified employees who are given a password in order to gain access to the information. We audit our security systems and processes on a regular basis. Sensitive information, such as credit card numbers or social security numbers, is protected by encryption protocols, in place to protect information sent over the Internet. While we take commercially reasonable measures to maintain a secure site, electronic communications and databases are subject to errors, tampering, and break-ins, and we cannot guarantee or warrant that such events will not take place and we will not be liable to Visitors or Authorized Customers for any such occurrences.
              </p>
            </section>

            <section id="accuracy" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-3">How can Visitors correct any inaccuracies in Personally Identifiable Information?</h2>
              <p className="text-gray-300">
                Visitors and Authorized Customers may contact us to update Personally Identifiable Information about them or to correct any inaccuracies by emailing us at info@ultraflexclothing.com
              </p>
            </section>

            <section id="deletion" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-3">Can a Visitor delete or deactivate Personally Identifiable Information collected by the Site?</h2>
              <p className="text-gray-300">
                We provide Visitors and Authorized Customers with a mechanism to delete/deactivate Personally Identifiable Information from the Site’s database by contacting. However, because of backups and records of deletions, it may be impossible to delete a Visitor’s entry without retaining some residual information. An individual who requests to have Personally Identifiable Information deactivated will have this information functionally deleted, and we will not sell, transfer, or use Personally Identifiable Information relating to that individual in any way moving forward.
              </p>
            </section>

            <section id="rights" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-3">Your rights</h2>
              <p className="text-gray-300">These are summarized rights that you have under data protection law</p>
              <ul className="mt-2 list-disc pl-6 text-gray-300 space-y-1">
                <li>The right to access</li>
                <li>The right to rectification</li>
                <li>The right to erasure</li>
                <li>The right to restrict processing</li>
                <li>The right to object to processing</li>
                <li>The right to data portability</li>
                <li>The right to complain to a supervisory authority</li>
                <li>The right to withdraw consent</li>
              </ul>
            </section>

            <section id="changes" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-3">What happens if the Privacy Policy Changes?</h2>
              <p className="text-gray-300">
                We will let our Visitors and Authorized Customers know about changes to our privacy policy by posting such changes on the Site. However, if we are changing our privacy policy in a manner that might cause disclosure of Personally Identifiable Information that a Visitor or Authorized Customer has previously requested not be disclosed, we will contact such Visitor or Authorized Customer to allow such Visitor or Authorized Customer to prevent such disclosure.
              </p>
            </section>

            <section id="links" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-3">Links</h2>
              <p className="text-gray-300">
                https://www.ultraflexclothing.com contains links to other websites. Please note that when you click on one of these links, you are moving to another website. We encourage you to read the privacy statements of these linked sites as their privacy policies may differ from ours.
              </p>
            </section>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
