import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Ticket, CalendarDays, Mail, ExternalLink, ArrowRight, MapPin, Phone, Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function MembershipIndex({ auth }: { auth: { user: any | null } }) {
  const ashbourneUrl = 'https://secure.ashbournemanagement.co.uk/signupuk/index.aspx?fn=grbh2';
  // Accurate locations and details (replace with backend data if available)
  // Use the same location names as Locations page
  const locations = [
    { name: 'West Leeds', slug: 'west-leeds' },
    { name: 'North Leeds', slug: 'north-leeds' },
    { name: 'Normanton', slug: 'normanton' },
    { name: 'Rotherham', slug: 'rotherham' },
    { name: 'York', slug: 'york' },
    { name: 'Hull', slug: 'hull' },
    { name: 'Durham', slug: 'durham' },
    { name: 'Derby', slug: 'derby' },
    { name: 'Athens (Greece)', slug: 'athens-greece' },
    { name: 'Lincoln', slug: 'lincoln' },
    { name: 'West London', slug: 'west-london' },
  ];
  // Client-side preview and go-live gating for Lincoln student memberships
  const goLiveISO = '2026-01-19T00:00:00Z'; // Jan is UTC for London (no DST)
  const search = typeof window !== 'undefined' ? window.location.search : '';
  const preview = typeof window !== 'undefined' ? new URLSearchParams(search).has('preview') : false;
  const isLive = preview || (typeof window !== 'undefined' && Date.now() >= Date.parse(goLiveISO));

  const lincolnStudentPlans = [
    { id: 101, name: 'Student Monthly Rolling', price: 48.60, period: 'month' },
    { id: 102, name: 'Student Monthly Rolling 24hr', price: 58.50, period: 'month' },
    { id: 103, name: '6 Month Pass paid in full', price: 265.50, period: '6 months' },
    { id: 104, name: '6 Month Pass paid in full 24hr', price: 319.50, period: '6 months' },
    { id: 105, name: '12 Month Pass paid in full', price: 477.00, period: '12 months' },
    { id: 106, name: '12 Month Pass paid in full 24hr', price: 531.00, period: '12 months' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');

  // Extract unique regions for filter
  const regions = ['all', ...Array.from(new Set(locations.map(loc => {
    if (loc.name.includes('Leeds')) return 'Leeds';
    if (loc.name.includes('London')) return 'London';
    if (loc.name.includes('Greece')) return 'Greece';
    return loc.name;
  })))];

  // Filter locations based on search and filter
  const filteredLocations = locations.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterRegion === 'all' || 
      (filterRegion === 'Leeds' && loc.name.includes('Leeds')) ||
      (filterRegion === 'London' && loc.name.includes('London')) ||
      (filterRegion === 'Greece' && loc.name.includes('Greece')) ||
      (filterRegion !== 'Leeds' && filterRegion !== 'London' && filterRegion !== 'Greece' && loc.name === filterRegion);
    return matchesSearch && matchesFilter;
  });

  return (
    <AppLayout auth={auth}>
      <Head title="Membership Options - ULTRAFLEX" />
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
              <span className="ultraflex-ultra text-white">ULTRA</span><span className="ultraflex-flex text-red-600">FLEX</span> Membership Options
            </h1>
            <p className="mt-3 max-w-3xl text-gray-300">
              Each Site has different prices, select your location below to see your ULTRAFLEX Gym's Prices Or Check Prices and Sign Up.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Dual Site Access */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-red-700/30">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-700/20 border border-red-700/30 text-red-600">
                  <Mail className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-white">Dual Site Access</h2>
              </div>
              <p className="mt-4 text-gray-300">
                To set up dual site access, first set up your direct debit with the gym that will be your home gym. Then, at the gym, the team can add a dual membership for access to another ULTRAFLEX site.
              </p>
              <div className="mt-3">
                <a href="/contact" className="text-sm text-red-600 hover:text-red-500 underline underline-offset-2">
                  Questions? Contact us
                </a>
              </div>
            </div>
          </div>
          {/* Sign Up Button */}
          <div className="mt-10">
            <a href={ashbourneUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 px-6 shadow-md hover:shadow-red-700/30 transition-shadow">
                Check Prices and Sign Up
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
          {/* Locations List */}
          <div className="mt-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-white">Select Your Location</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-700/50 focus:ring-1 focus:ring-red-700/50 transition-all w-full sm:w-64"
                  />
                </div>
                {/* Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <select
                    value={filterRegion}
                    onChange={(e) => setFilterRegion(e.target.value)}
                    className="pl-10 pr-8 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-700/50 focus:ring-1 focus:ring-red-700/50 transition-all appearance-none cursor-pointer w-full sm:w-48"
                  >
                    <option value="all">All Locations</option>
                    {regions.filter(r => r !== 'all').map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredLocations.map(loc => (
                <div key={loc.slug} className="hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 hover:-translate-y-1 bg-black/20 border border-white/10 hover:border-red-700/30 group rounded-xl flex flex-col items-center justify-center p-8">
                  <h3 className="text-xl font-bold text-white group-hover:text-red-700 transition-colors duration-300 mb-4">
                    <span className="ultraflex-ultra text-white">ULTRA</span><span className="ultraflex-flex text-red-700">FLEX</span> {loc.name}
                  </h3>
                  <a href={`https://secure.ashbournemanagement.co.uk/signupuk/index.aspx?fn=grbh2&site=${loc.slug}`} target="_blank" rel="noopener noreferrer" className="block w-full">
                    <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-red-700/20 backdrop-blur-sm">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        Sign Up
                      </span>
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Featured: Lincoln Student Memberships (preview or post go-live) */}
          {isLive && (
            <div className="mt-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                <CalendarDays className="h-3.5 w-3.5 text-red-600" />
                New for Lincoln
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white">Lincoln Student Memberships</h2>
              <p className="mt-3 max-w-3xl text-gray-300">Available at ULTRAFLEX Lincoln. Bring a valid student ID. Join via Ashbourne.</p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {lincolnStudentPlans.map((plan) => (
                  <div key={plan.id} className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-red-700/30">
                    <h3 className="text-lg font-semibold text-white group-hover:text-red-600 transition-colors">{plan.name}</h3>
                    <div className="mt-2 text-3xl font-bold text-red-700">£{plan.price.toFixed(2)}<span className="text-base text-gray-400">/{plan.period}</span></div>
                    <div className="mt-4">
                      <a href={ashbourneUrl} target="_blank" rel="noopener noreferrer" aria-label="Join via Ashbourne">
                        <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-red-700/30 transition-shadow">
                          Join via Ashbourne
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-sm text-gray-400">Want to view on the Lincoln page? <a className="text-red-600 underline" href="/locations/lincoln?preview=1">Open Lincoln</a></div>
            </div>
          )}

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
