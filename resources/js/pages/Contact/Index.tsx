import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Mail, Phone, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import LocationSelect from '@/components/LocationSelect';
import AnimatedBackground from '@/components/AnimatedBackground';

interface Location {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  coordinates: { lat: number; lng: number };
}

interface LocationOption {
  id: number;
  name: string;
}

interface ContactIndexProps {
  locations: Location[];
  locationOptions?: LocationOption[];
  gymContacts: Location[];
  auth: { user: any };
}

export default function ContactIndex({
  locations,
  locationOptions = [],
  gymContacts,
  auth,
}: ContactIndexProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    subject: '',
    message: '',
    location_id: '' as number | string,
  });

  const [humanVerified, setHumanVerified] = useState(false);
  const [localErrors, setLocalErrors] = useState<{ location_id?: string; human?: string }>({});
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterOptions = [
    { id: 'all', label: 'All Locations', cities: [] },
    { id: 'leeds', label: 'Leeds', cities: ['WEST LEEDS', 'NORTH LEEDS'] },
    { id: 'yorkshire', label: 'Yorkshire', cities: ['YORK', 'HULL', 'NORMANTON', 'ROTHERHAM'] },
    { id: 'midlands', label: 'Midlands', cities: ['DERBY', 'LINCOLN'] },
    { id: 'durham', label: 'Durham', cities: ['DURHAM'] },
    { id: 'london', label: 'London', cities: ['WEST LONDON'] },
    { id: 'international', label: 'International', cities: ['ATHENS'] },
  ];

  const filteredGymContacts = gymContacts.filter((gym) => {
    const matchesSearch = gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gym.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gym.phone.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    
    const filterOption = filterOptions.find(f => f.id === selectedFilter);
    const matchesFilter = filterOption?.cities.some(city => gym.name.toUpperCase().includes(city));
    
    return matchesSearch && matchesFilter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextLocalErrors: { location_id?: string; human?: string } = {};
    if (!data.location_id) {
      nextLocalErrors.location_id = 'Please select Head Office or a specific site.';
    }
    let recaptchaResponse = recaptchaToken;
    try {
      // @ts-ignore
      recaptchaResponse = recaptchaResponse || window.grecaptcha?.getResponse?.() || '';
    } catch {}
    if (!recaptchaResponse) {
      try {
        // @ts-ignore
        if (window.grecaptcha) {
          // @ts-ignore
          window.grecaptcha.execute();
          nextLocalErrors.human = '';
          setLocalErrors(nextLocalErrors);
          return;
        }
      } catch {}
    }
    if (!recaptchaResponse && !humanVerified) {
      nextLocalErrors.human = 'Please complete the CAPTCHA verification.';
    }
    if (recaptchaResponse) {
      // @ts-ignore
      setData('g_recaptcha_response', recaptchaResponse);
    }
    setLocalErrors(nextLocalErrors);
    if (nextLocalErrors.location_id || nextLocalErrors.human) return;

    post('/contact', {
      onSuccess: () => {
        reset();
        setHumanVerified(false);
        setLocalErrors({});
        setRecaptchaToken('');
        try {
          // @ts-ignore
          window.grecaptcha?.reset?.();
        } catch {}
      },
    });
  };

  const contactReasons = [
    {
      title: 'General Enquiries',
      description: 'Questions about membership, facilities, or services',
    },
    {
      title: 'Personal Training',
      description: 'Book sessions or learn about our trainers',
    },
    { title: 'Feedback', description: 'Share your experience or suggestions' },
    { title: 'Partnerships', description: 'Business and media enquiries' },
  ];

  return (
    <AppLayout auth={auth}>
      <Head title="Contact Us - ULTRAFLEX">
        <meta
          name="description"
          content="Get in touch with ULTRAFLEX. Find our locations, contact information, and send us a message. We're here to help with all your fitness needs."
        />
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
        <script>{`window.onRecaptchaSuccess = function(token){ /* handled in component */ }`}</script>
      </Head>

      <div className="min-h-screen relative">
        <AnimatedBackground variant="gradient" intensity="medium" className="z-0" />

        <div className="relative z-10">
          {/* Hero */}
          <section className="relative py-20 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=1920&h=1080&fit=crop&q=80)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-red-900/70 to-black/80 backdrop-blur-sm" />
            <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                <span className="text-red-700">Contact</span>{' '}
                <span className="text-white">Us</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                Have questions? We're here to help! Reach out for membership
                information, personal training, or anything else.
              </p>
            </div>
          </section>

          {/* Quick Contact */}
          <section className="py-12 sm:py-16 bg-black/20 backdrop-blur-md">
            <div className="container mx-auto px-4 sm:px-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-white">
                How Can We Help?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {contactReasons.map((r, i) => (
                  <Card
                    key={i}
                    className="p-6 text-center bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">{r.title}</h3>
                    <p className="text-gray-300 text-sm">{r.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Form + Info */}
          <section className="py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                {/* Form */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white">Send Us a Message</h2>
                  <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                        <Input
                          type="text"
                          value={data.name}
                          onChange={(e) => setData('name', e.target.value)}
                          required
                          className={`bg-black/20 border-white/20 text-white placeholder-gray-400 ${errors.name ? 'border-red-500' : ''}`}
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Email Address</label>
                        <Input
                          type="email"
                          value={data.email}
                          onChange={(e) => setData('email', e.target.value)}
                          required
                          className={`bg-black/20 border-white/20 text-white placeholder-gray-400 ${errors.email ? 'border-red-500' : ''}`}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Subject</label>
                        <Input
                          type="text"
                          value={data.subject}
                          onChange={(e) => setData('subject', e.target.value)}
                          required
                          className={`bg-black/20 border-white/20 text-white placeholder-gray-400 ${errors.subject ? 'border-red-500' : ''}`}
                          placeholder="What is your enquiry about?"
                        />
                        {errors.subject && (
                          <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                        )}
                      </div>

                      <div>
                        <LocationSelect
                          options={locationOptions}
                          value={data.location_id}
                          onChange={(val) => setData('location_id', val)}
                          label="Location (Required)"
                          placeholder="Select a location or Head Office"
                          className="text-sm"
                        />
                        {(errors.location_id || localErrors.location_id) && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.location_id || localErrors.location_id}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-white">
                          <input
                            type="checkbox"
                            checked={humanVerified}
                            onChange={(e) => setHumanVerified(e.target.checked)}
                            className="h-4 w-4 rounded border-white/30 bg-black/30"
                            aria-label="Human verification"
                          />
                          <span>I am human (anti-spam verification)</span>
                        </label>
                        {localErrors.human && (
                          <p className="text-red-500 text-sm mt-1">{localErrors.human}</p>
                        )}
                      </div>

                      <div>
                        <div
                          id="recaptcha"
                          className="g-recaptcha"
                          data-sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''}
                          data-size="invisible"
                          data-callback="onRecaptchaSuccess"
                        ></div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Message</label>
                        <Textarea
                          value={data.message}
                          onChange={(e) => setData('message', e.target.value)}
                          rows={6}
                          required
                          className={`bg-black/20 border-white/20 text-white placeholder-gray-400 ${errors.message ? 'border-red-500' : ''}`}
                          placeholder="Please provide details about your enquiry..."
                        />
                        {errors.message && (
                          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition"
                        disabled={processing}
                      >
                        {processing ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </Card>

                  <div className="mt-6 p-4 bg-red-700/10 rounded-lg border border-red-700/30">
                    <p className="text-sm text-red-700">
                      <strong>Response Time:</strong> We typically respond within 24
                      business hours.
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-8 text-white">Get In Touch</h2>
                    <Card className="p-6 mb-6 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-colors">
                      <h3 className="text-xl font-semibold text-white mb-4">Gym Contacts</h3>
                      
                      {/* Search Input */}
                      <div className="mb-3 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search by name, email or phone..."
                          className="pl-10 bg-black/20 border-white/20 text-white placeholder-gray-400 focus:border-red-700"
                        />
                      </div>

                      {/* Filter Chips */}
                      <div className="mb-4 flex flex-wrap gap-2">
                        {filterOptions.map((filter) => (
                          <button
                            key={filter.id}
                            onClick={() => setSelectedFilter(filter.id)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                              selectedFilter === filter.id
                                ? 'bg-red-700 text-white shadow-lg shadow-red-700/50'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                            }`}
                          >
                            {filter.label}
                          </button>
                        ))}
                        {(selectedFilter !== 'all' || searchQuery) && (
                          <button
                            onClick={() => {
                              setSelectedFilter('all');
                              setSearchQuery('');
                            }}
                            className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-gray-300 hover:bg-red-700/20 hover:text-red-400 transition-all duration-300 flex items-center gap-1"
                          >
                            <X className="h-3 w-3" />
                            Clear
                          </button>
                        )}
                      </div>

                      {/* Gym Contacts List with Custom Scrollbar */}
                      <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-red-700 scrollbar-track-white/10 hover:scrollbar-thumb-red-600">
                        {filteredGymContacts.length > 0 ? (
                          filteredGymContacts.map((gym) => (
                            <div key={gym.id} className="pb-3 border-b border-white/10 last:border-b-0">
                              <h4 className="font-semibold text-white text-sm mb-2">{gym.name}</h4>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-gray-300 text-xs">
                                  <Mail className="h-3 w-3 text-red-600" />
                                  <span>{gym.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300 text-xs">
                                  <Phone className="h-3 w-3 text-red-600" />
                                  <span>{gym.phone}</span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-400 text-sm">No gyms found matching "{searchQuery}"</p>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Other Ways to Reach Us</h3>
                    <div className="space-y-3">
                      <Link href="/trainers" className="block">
                        <Card className="p-4 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div>
                              <p className="font-medium text-white">Personal Training</p>
                              <p className="text-sm text-gray-300">Contact trainers directly</p>
                            </div>
                          </div>
                        </Card>
                      </Link>

                      <Link href="/locations" className="block">
                        <Card className="p-4 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div>
                              <p className="font-medium text-white">Visit a Location</p>
                              <p className="text-sm text-gray-300">Speak with our staff in person</p>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Locations */}
          <section className="py-16 bg-black/20 backdrop-blur-md">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Locations</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {locations.map((location) => (
                  <Card
                    key={location.id}
                    className="overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition"
                  >
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">{location.name}</h3>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-start space-x-3">
                          <span className="text-gray-300 text-sm">Address: {location.address}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-300 text-sm">Phone: {location.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-300 text-sm">Email: {location.email}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white"
                          onClick={() =>
                            window.open(
                              `https://maps.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`,
                              '_blank',
                            )
                          }
                        >
                          Get Directions
                        </Button>
                        <Link href={`/locations/${location.id}`} className="block w-full">
                          <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700">
                            View Location Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-16">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10">
                  <h3 className="text-white font-semibold mb-2">How do I freeze my membership?</h3>
                  <p className="text-gray-300 text-sm">
                    Please contact your home location via the form and select your location. Our team
                    will assist you with the process.
                  </p>
                </Card>
                <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10">
                  <h3 className="text-white font-semibold mb-2">Do you offer student discounts?</h3>
                  <p className="text-gray-300 text-sm">
                    Yes, selected locations offer student memberships. Check the memberships page or
                    contact us for details.
                  </p>
                </Card>
                <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10">
                  <h3 className="text-white font-semibold mb-2">How can I book a personal trainer?</h3>
                  <p className="text-gray-300 text-sm">
                    Visit the trainers page to view profiles and contact trainers directly.
                  </p>
                </Card>
                <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10">
                  <h3 className="text-white font-semibold mb-2">What are your opening hours?</h3>
                  <p className="text-gray-300 text-sm">
                    Each location varies in opening times. Please review the location page to see your gym's opening hours.
                  </p>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
