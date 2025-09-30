import { Head } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import AppLayout from '@/layouts/app-layout';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import LocationSelect from '@/components/LocationSelect';

interface MembershipPlan {
  id: number;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
}

interface LocationInfoLite {
  id: number;
  name: string;
  slug: string;
  planCount: number;
}

interface PlansByLocationEntry {
  id: number;
  name: string;
  plans: MembershipPlan[];
}

interface MembershipIndexProps {
  locations: LocationInfoLite[];
  plansByLocation: Record<string, PlansByLocationEntry>;
  auth: { user: any };
}

export default function MembershipIndex({ locations, plansByLocation, auth }: MembershipIndexProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>(locations[0]?.slug ?? '');
  const [showAll, setShowAll] = useState<boolean>(false);

  const currentPlans = useMemo(() => {
    if (showAll) {
      // Flatten all plans with slug context
      return Object.entries(plansByLocation).flatMap(([slug, data]) => data.plans.map(p => ({ ...p, _slug: slug, _locationName: data.name })));
    }
    const entry = plansByLocation[selectedSlug];
    return entry ? entry.plans.map(p => ({ ...p, _slug: selectedSlug, _locationName: entry.name })) : [];
  }, [selectedSlug, showAll, plansByLocation]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSlug(e.target.value);
    setShowAll(false);
  };

  return (
    <AppLayout auth={auth}>
      <Head title="Membership Options - UltraFlex">
        <meta name="description" content="Compare UltraFlex membership plans across all locations. Choose the plan that fits your goals and lifestyle." />
      </Head>
      <div className="min-h-screen relative">
        <AnimatedBackground variant="gradient" intensity="medium" className="z-0" />
        <div className="relative z-10 px-6 py-16 container mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">
              <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">Membership</span>{' '}
              <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]">Plans</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Explore flexible, great-value options tailored to each UltraFlex location. Compare or drill into a single club.</p>
          </div>

          {/* Controls */}
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-10">
            <div className="flex-1">
              <LocationSelect
                label="Select a Location"
                options={locations.map(l => ({ id: l.slug, name: l.name }))}
                value={selectedSlug}
                onChange={(val) => { setSelectedSlug(val as string); setShowAll(false); }}
                disabled={showAll}
                placeholder="Choose a gym"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant={showAll ? 'default' : 'outline'}
                className={showAll ? 'bg-gradient-to-r from-red-700 to-red-800 text-white border-red-700/40' : 'border-white/30 text-white hover:text-red-700'}
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? 'Viewing All Locations' : 'Compare All'}
              </Button>
            </div>
          </div>

          {/* Plans Grid */}
          {currentPlans.length === 0 ? (
            <div className="text-center text-gray-400 py-20">No membership plans available.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentPlans.map(plan => (
                <Card
                  key={plan._slug + '-' + plan.id}
                  className={`relative h-full flex flex-col group backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                    plan.popular ? 'bg-gradient-to-br from-red-900/60 to-red-800/60 border-2 border-red-700/50' : 'bg-black/40 border border-white/10 hover:border-red-700/30'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="bg-gradient-to-r from-red-700 to-red-800 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-red-700/20 backdrop-blur-sm">
                        MOST POPULAR
                      </div>
                    </div>
                  )}
                  <CardContent className="p-5 flex flex-col flex-1 relative">
                    <div className="mb-5 text-center">
                      {showAll && (
                        <div className="text-[10px] tracking-wide font-semibold uppercase text-red-500 mb-2">{plan._locationName}</div>
                      )}
                      <h3 className="text-lg font-bold text-white group-hover:text-red-700 transition-colors duration-300 mb-1">{plan.name}</h3>
                      <div className="flex items-baseline justify-center flex-wrap">
                        <span className="text-2xl font-bold text-red-700">£{plan.price}</span>
                        <span className="text-gray-400 ml-2 text-xs">/{plan.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-4 flex-1">
                      {plan.features.slice(0,6).map((feature, i) => (
                        <li key={i} className="flex items-start text-gray-300 group-hover:text-white transition-colors duration-300 text-xs">
                          <Check className="h-3 w-3 text-red-700 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full font-semibold rounded-md text-sm mt-auto transition-all duration-300 group ${
                        plan.popular ? 'bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white border border-red-700/40' : 'bg-white text-black hover:bg-red-700 hover:text-white border border-white/20'
                      }`}
                      onClick={() => window.open('https://secure.ashbournemanagement.co.uk/signupuk/index.aspx?fn=grbh2', '_blank')}
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">Join Now</span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Meta info */}
          <div className="mt-16 text-center text-gray-400 text-sm max-w-4xl mx-auto leading-relaxed">
            Pricing & availability may vary by location. Student, GOLD, 24hr and specialty passes shown where applicable. All memberships subject to terms & fair usage policies.
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
