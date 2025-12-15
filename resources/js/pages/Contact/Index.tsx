import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import LocationSelect from '@/components/LocationSelect';

import AnimatedBackground from '@/components/AnimatedBackground'; // Import the animated background

interface Location {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}

interface GeneralContact {
    phone: string;
    email: string;
    address: string;
}

interface LocationOption { id: number; name: string; }

interface ContactIndexProps {
    locations: Location[];
    locationOptions?: LocationOption[];
    generalContact: GeneralContact;
    auth: { user: any };
}

export default function ContactIndex({ locations, locationOptions = [], generalContact, auth }: ContactIndexProps) {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Frontend guard: require location selection and human verification
        const nextLocalErrors: { location_id?: string; human?: string } = {};
        if (!data.location_id) {
            nextLocalErrors.location_id = 'Please select Head Office or a specific site.';
        }
        // Run Invisible reCAPTCHA: trigger challenge popup on submit if no token
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
                    // Wait for user to solve the popup; do not proceed yet
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
        if (nextLocalErrors.location_id || nextLocalErrors.human) {
            return;
        }

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
            }
        });
    };

    const contactReasons = [
        {
            title: 'General Enquiries',
            description: 'Questions about membership, facilities, or services',
            color: 'bg-red-700/20 text-red-700 backdrop-blur-sm border border-red-700/30'
        },
        {
            title: 'Personal Training',
            description: 'Book sessions or learn about our trainers',
            color: 'bg-green-700/20 text-green-400 backdrop-blur-sm border border-green-700/30'
        },
        {
            title: 'Feedback',
            description: 'Share your experience or suggestions',
            color: 'bg-orange-700/20 text-orange-400 backdrop-blur-sm border border-orange-700/30'
        }
    ];

    return (
        <AppLayout auth={auth}>
            <Head title="Contact Us - UltraFlex">
                <meta name="description" content="Get in touch with UltraFlex. Find our locations, contact information, and send us a message. We're here to help with all your fitness needs." />
                <script src="https://www.google.com/recaptcha/api.js" async defer></script>
                <script>
                    {`window.onRecaptchaSuccess = function(token){ /* placeholder – bound in component via useEffect */ }`}
                </script>
            </Head>

            <div className="min-h-screen relative">
                {/* Global Animated Background */}
                <AnimatedBackground 
                    variant="gradient" 
                    intensity="medium"
                    className="z-0"
                />
                
                {/* All content with higher z-index */}
                <div className="relative z-10">
                    {/* Hero Section */}
                    <section className="relative py-20 overflow-hidden">
                        {/* Background Image */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: 'url(https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=1920&h=1080&fit=crop&q=80)'
                            }}
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-red-900/70 to-black/80 backdrop-blur-sm" />
                        
                        {/* Hero particles */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {Array.from({ length: 15 }, (_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
                                    style={{
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 3}s`,
                                        animationDuration: `${2 + Math.random() * 2}s`
                                    }}
                                />
                            ))}
                        </div>

                        <div className="container mx-auto px-6 text-center relative z-10">
                            <h1 className="text-5xl font-bold mb-6">
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Contact</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Us</span>
                            </h1>
                            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                                Have questions? We're here to help! Reach out to us for membership information, 
                                personal training, or any other enquiries.
                            </p>
                        </div>
                    </section>

                    {/* Quick Contact Options */}
                    <section className="py-16 bg-black/20 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-center mb-12">
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">How</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Can</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">We</span>{' '}
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Help?</span>
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {contactReasons.map((reason, index) => {
                                    return (
                                        <Card key={index} className="p-6 text-center hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">{reason.title}</h3>
                                            <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">{reason.description}</p>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* Contact Form and Info */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <div className="grid lg:grid-cols-2 gap-12">
                                {/* Contact Form */}
                                <div>
                                    <h2 className="text-3xl font-bold mb-8">
                                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Send</span>{' '}
                                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Us</span>{' '}
                                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">a</span>{' '}
                                        <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Message</span>
                                    </h2>
                                    
                                    <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10">
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-white mb-2">
                                                    Full Name
                                                </label>
                                                <Input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    required
                                                    className={`bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:border-red-700/50 focus:ring-red-700/50 ${errors.name ? 'border-red-500' : ''}`}
                                                    placeholder="Your full name"
                                                />
                                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-white mb-2">
                                                    Email Address
                                                </label>
                                                <Input
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    required
                                                    className={`bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:border-red-700/50 focus:ring-red-700/50 ${errors.email ? 'border-red-500' : ''}`}
                                                    placeholder="your.email@example.com"
                                                />
                                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-white mb-2">
                                                    Subject
                                                </label>
                                                <Input
                                                    type="text"
                                                    value={data.subject}
                                                    onChange={(e) => setData('subject', e.target.value)}
                                                    required
                                                    className={`bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:border-red-700/50 focus:ring-red-700/50 ${errors.subject ? 'border-red-500' : ''}`}
                                                    placeholder="What is your enquiry about?"
                                                />
                                                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
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
                                                    <p className="text-red-500 text-sm mt-1">{errors.location_id || localErrors.location_id}</p>
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
                                                {localErrors.human && <p className="text-red-500 text-sm mt-1">{localErrors.human}</p>}
                                            </div>

                                            <div>
                                                <div
                                                    id="recaptcha"
                                                    className="g-recaptcha"
                                                    data-sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''}
                                                    data-size="invisible"
                                                    data-callback="onRecaptchaSuccess"
                                                ></div>
                                                {localErrors.human && <p className="text-red-500 text-sm mt-1">{localErrors.human}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-white mb-2">
                                                    Message
                                                </label>
                                                <Textarea
                                                    value={data.message}
                                                    onChange={(e) => setData('message', e.target.value)}
                                                    rows={6}
                                                    required
                                                    className={`bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:border-red-700/50 focus:ring-red-700/50 ${errors.message ? 'border-red-500' : ''}`}
                                                    placeholder="Please provide details about your enquiry..."
                                                />
                                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                                            </div>

                                            <Button 
                                                type="submit" 
                                                className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group"
                                                disabled={processing}
                                            >
                                                {processing ? (
                                                    'Sending...'
                                                ) : (
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        Send Message
                                                    </span>
                                                )}
                                            </Button>
                                        </form>
                                    </Card>

                                    <div className="mt-6 p-4 bg-red-700/10 backdrop-blur-sm rounded-lg border border-red-700/30">
                                        <p className="text-sm text-red-700">
                                            <strong>Response Time:</strong> We typically respond to enquiries within 24 hours during business days.
                                        </p>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-3xl font-bold mb-8">
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Get</span>{' '}
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">In</span>{' '}
                                            <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Touch</span>
                                        </h2>
                                        
                                        {/* General Contact */}
                                        <Card className="p-6 mb-6 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-colors duration-300">
                                            <h3 className="text-xl font-semibold text-white mb-4">General Contact</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center space-x-3 group hover:text-red-700 transition-colors duration-300">
                                                    <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">Phone: {generalContact.phone}</span>
                                                </div>
                                                <div className="flex items-center space-x-3 group hover:text-red-700 transition-colors duration-300">
                                                    <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">Email: {generalContact.email}</span>
                                                </div>
                                                <div className="flex items-start space-x-3 group hover:text-red-700 transition-colors duration-300">
                                                    <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">Address: {generalContact.address}</span>
                                                </div>
                                            </div>
                                        </Card>

                                        {/* Business Hours */}
                                        <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-colors duration-300">
                                            <h3 className="text-xl font-semibold text-white mb-4">
                                                Business Hours
                                            </h3>
                                            <div className="space-y-2 text-gray-300">
                                                <div className="flex justify-between group hover:text-red-700 transition-colors duration-300">
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">Monday - Friday:</span>
                                                    <span>9:00 AM - 8:00 PM</span>
                                                </div>
                                                <div className="flex justify-between group hover:text-red-700 transition-colors duration-300">
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">Saturday:</span>
                                                    <span>9:00 AM - 6:00 PM</span>
                                                </div>
                                                <div className="flex justify-between group hover:text-red-700 transition-colors duration-300">
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">Sunday:</span>
                                                    <span>10:00 AM - 4:00 PM</span>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>

                                    {/* Alternative Contact Methods */}
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-4">Other Ways to Reach Us</h3>
                                        <div className="space-y-3">
                                            <Link href="/trainers" className="block">
                                                <Card className="p-4 hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 cursor-pointer bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                                    <div className="flex items-center space-x-3">
                                                        <div>
                                                            <p className="font-medium text-white group-hover:text-red-700 transition-colors duration-300">Personal Training</p>
                                                            <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">Contact trainers directly</p>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Link>

                                            <Link href="/locations" className="block">
                                                <Card className="p-4 hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 cursor-pointer bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                                    <div className="flex items-center space-x-3">
                                                        <div>
                                                            <p className="font-medium text-white group-hover:text-red-700 transition-colors duration-300">Visit a Location</p>
                                                            <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">Speak with our staff in person</p>
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

                    {/* Location Cards */}
                    <section className="py-16 bg-black/20 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-center mb-12">
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Our</span>{' '}
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Locations</span>
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {locations.map((location) => (
                                    <Card key={location.id} className="overflow-hidden hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                        <CardContent className="p-6">
                                            <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-red-700 transition-colors duration-300">{location.name}</h3>
                                            
                                            <div className="space-y-3 mb-6">
                                                <div className="flex items-start space-x-3 group hover:text-red-700 transition-colors duration-300">
                                                    <span className="text-gray-300 text-sm group-hover:text-white group-hover:translate-x-1 transition-all duration-300">Address: {location.address}</span>
                                                </div>
                                                <div className="flex items-center space-x-3 group hover:text-red-700 transition-colors duration-300">
                                                    <span className="text-gray-300 text-sm group-hover:text-white group-hover:translate-x-1 transition-all duration-300">Phone: {location.phone}</span>
                                                </div>
                                                <div className="flex items-center space-x-3 group hover:text-red-700 transition-colors duration-300">
                                                    <span className="text-gray-300 text-sm group-hover:text-white group-hover:translate-x-1 transition-all duration-300">Email: {location.email}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Button 
                                                    variant="outline" 
                                                    className="w-full border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm"
                                                    onClick={() => window.open(`https://maps.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`, '_blank')}
                                                >
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        Get Directions
                                                    </span>
                                                </Button>
                                                <Link href={`/locations/${location.id}`} className="block w-full">
                                                    <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group">
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                            View Location Details
                                                        </span>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-center mb-12">
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Frequently</span>{' '}
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Asked</span>{' '}
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Questions</span>
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group">
                                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">What are your membership options?</h3>
                                    <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
                                        We offer flexible membership plans including monthly and annual options. Day passes are available in-gym only. 
                                        Visit any location for detailed pricing and package options.
                                    </p>
                                </Card>


                                <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group">
                                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">Can I freeze my membership?</h3>
                                    <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
                                        Yes, we offer membership freezes for various circumstances. 
                                        Contact us to discuss your specific situation and available options.
                                    </p>
                                </Card>

                                <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group">
                                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">Do you offer personal training?</h3>
                                    <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
                                        Absolutely! We have certified personal trainers available at all locations. 
                                        Book a consultation to find the perfect trainer for your goals.
                                    </p>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* Map Section */}
                    <section className="py-16 bg-black/10 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-center mb-12">
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Find</span>{' '}
                                <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Us</span>
                            </h2>
                            <div className="bg-black/30 backdrop-blur-sm rounded-lg h-96 flex items-center justify-center border border-white/10 relative overflow-hidden">
                                {/* Map particles */}
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                                            style={{
                                                top: `${Math.random() * 100}%`,
                                                left: `${Math.random() * 100}%`,
                                                animationDelay: `${Math.random() * 3}s`,
                                                animationDuration: `${2 + Math.random() * 2}s`
                                            }}
                                        />
                                    ))}
                                </div>
                                
                                <div className="text-center text-gray-400 relative z-10">
                                    <p className="text-lg font-medium text-white">Interactive Map</p>
                                    <p className="text-sm text-gray-300">Google Maps integration would go here</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}