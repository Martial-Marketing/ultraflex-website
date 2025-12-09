import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Ticket, CalendarDays, Mail, ExternalLink, ArrowRight } from 'lucide-react';

export default function MembershipIndex({ auth }: { auth: { user: any | null } }) {
  const ashbourneUrl = 'https://secure.ashbournemanagement.co.uk/signupuk/index.aspx?fn=grbh2';
  return (
    <AppLayout auth={auth}>
      <Head title="Membership Options - UltraFlex" />
      <div className="min-h-screen relative">
        <AnimatedBackground variant="gradient" intensity="medium" className="z-0" />
        <div className="relative z-10 container mx-auto px-6 py-16">
          {/* Heading */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
              <ExternalLink className="h-3.5 w-3.5 text-red-600" />
              Pricing varies by site
            </div>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white">
              Membership Options
            </h1>
            <p className="mt-3 max-w-3xl text-gray-300">
              Each site has different price ranges, so we don’t advertise fixed prices here. Use the options below and check Ashbourne for the site you’re interested in.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Day Passes */}
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-red-700/30">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-700/20 border border-red-700/30 text-red-600">
                  <Ticket className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-white">Day Passes</h2>
              </div>
              <p className="mt-4 text-gray-300">Day passes are available to purchase at the gym reception.</p>
              <div className="mt-3">
                <a href="/locations" className="text-sm text-red-600 hover:text-red-500 underline underline-offset-2">
                  View locations
                </a>
              </div>
            </div>

            {/* Weekly / Monthly */}
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-red-700/30">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-700/20 border border-red-700/30 text-red-600">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-white">Weekly & Monthly</h2>
              </div>
              <p className="mt-4 text-gray-300">Weekly and Monthly passes are available. Check Ashbourne for your site’s options.</p>
              <div className="mt-4">
                <a href={ashbourneUrl} target="_blank" rel="noopener noreferrer" aria-label="Find out more on Ashbourne">
                    <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-red-700/30 transition-shadow">
                    Click here to find out more…
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>

            {/* Dual Site Access */}
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-red-700/30">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-700/20 border border-red-700/30 text-red-600">
                  <Mail className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-white">Dual Site Access</h2>
              </div>
              <p className="mt-4 text-gray-300">
                To set up dual site access, first set up your direct debit with the gym that will be your home gym. Then, at the gym, the team can add a dual membership for access to another UltraFlex site.
              </p>
              <div className="mt-3">
                <a href="/contact" className="text-sm text-red-600 hover:text-red-500 underline underline-offset-2">
                  Questions? Contact us
                </a>
              </div>
            </div>
          </div>

          {/* Big CTA */}
          <div className="mt-10">
            <a href={ashbourneUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 px-6 shadow-md hover:shadow-red-700/30 transition-shadow">
                Check prices and join via Ashbourne
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
