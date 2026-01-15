import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import AnimatedBackground from '@/components/AnimatedBackground';
import { User } from '@/types';

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

interface AuthProps {
    user: User | null;
}

interface ContactWithLayoutProps {
    locations: Location[];
    generalContact: GeneralContact;
    auth: AuthProps;
}

export default function ContactWithLayout({ locations, generalContact, auth }: ContactWithLayoutProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        location_id: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout auth={auth}>
            <Head title="Contact Us - ULTRAFLEX">
                <meta name="description" content="Get in touch with ULTRAFLEX. Find our locations, contact information, and send us a message." />
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
                    {/* Header Section */}
                    <section className="bg-gradient-to-r from-red-900/80 to-red-700/80 py-16 backdrop-blur-sm relative overflow-hidden">
                        <div className="container mx-auto px-6">
                            <div className="text-center">
                                <h1 className="text-5xl font-bold text-white mb-4">Contact <span className="ultraflex-ultra text-white">ULTRA</span><span className="ultraflex-flex text-red-600">FLEX</span></h1>
                                <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                                    We're here to help you achieve your fitness goals. Get in touch with us today.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Contact Form and Info */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <div className="grid lg:grid-cols-2 gap-12">
                                {/* Contact Form */}
                                <div>
                                    <Card className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-colors duration-300">
                                        <CardContent className="p-8">
                                            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                                            
                                            <form onSubmit={submit} className="space-y-6">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-white text-sm font-medium mb-2">
                                                            Name *
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            value={data.name}
                                                            onChange={(e) => setData('name', e.target.value)}
                                                            className="bg-black/20 border-white/20 text-white placeholder-gray-400 focus:border-red-700"
                                                            placeholder="Your full name"
                                                            required
                                                        />
                                                        {errors.name && (
                                                            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label className="block text-white text-sm font-medium mb-2">
                                                            Email *
                                                        </label>
                                                        <Input
                                                            type="email"
                                                            value={data.email}
                                                            onChange={(e) => setData('email', e.target.value)}
                                                            className="bg-black/20 border-white/20 text-white placeholder-gray-400 focus:border-red-700"
                                                            placeholder="your@email.com"
                                                            required
                                                        />
                                                        {errors.email && (
                                                            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-white text-sm font-medium mb-2">
                                                            Phone
                                                        </label>
                                                        <Input
                                                            type="tel"
                                                            value={data.phone}
                                                            onChange={(e) => setData('phone', e.target.value)}
                                                            className="bg-black/20 border-white/20 text-white placeholder-gray-400 focus:border-red-700"
                                                            placeholder="(555) 123-4567"
                                                        />
                                                        {errors.phone && (
                                                            <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label className="block text-white text-sm font-medium mb-2">
                                                            Preferred Location
                                                        </label>
                                                        <select
                                                            value={data.location_id}
                                                            onChange={(e) => setData('location_id', e.target.value)}
                                                            className="w-full px-3 py-2 bg-black/20 border border-white/20 rounded-md text-white placeholder-gray-400 focus:border-red-700 focus:outline-none"
                                                        >
                                                            <option value="">Select a location</option>
                                                            {locations.map((location) => (
                                                                <option key={location.id} value={location.id} className="bg-black text-white">
                                                                    {location.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.location_id && (
                                                            <p className="text-red-400 text-sm mt-1">{errors.location_id}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-white text-sm font-medium mb-2">
                                                        Subject *
                                                    </label>
                                                    <Input
                                                        type="text"
                                                        value={data.subject}
                                                        onChange={(e) => setData('subject', e.target.value)}
                                                        className="bg-black/20 border-white/20 text-white placeholder-gray-400 focus:border-red-700"
                                                        placeholder="What can we help you with?"
                                                        required
                                                    />
                                                    {errors.subject && (
                                                        <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-white text-sm font-medium mb-2">
                                                        Message *
                                                    </label>
                                                    <Textarea
                                                        value={data.message}
                                                        onChange={(e) => setData('message', e.target.value)}
                                                        className="bg-black/20 border-white/20 text-white placeholder-gray-400 focus:border-red-700 min-h-[120px]"
                                                        placeholder="Please provide details about your inquiry..."
                                                        required
                                                    />
                                                    {errors.message && (
                                                        <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                                                    )}
                                                </div>

                                                <Button 
                                                    type="submit" 
                                                    disabled={processing}
                                                    className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group"
                                                >
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        {processing ? 'Sending...' : 'Send Message'}
                                                    </span>
                                                </Button>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Contact Information */}
                                <div className="space-y-8">
                                    <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                                        <CardContent className="p-8">
                                            <h3 className="text-xl font-bold text-white mb-4">General Information</h3>
                                            <div className="space-y-4 text-gray-300">
                                                <div>
                                                    <h4 className="font-medium text-white">Phone</h4>
                                                    <p>{generalContact.phone}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-white">Email</h4>
                                                    <p>{generalContact.email}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-white">Address</h4>
                                                    <p>{generalContact.address}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                                        <CardContent className="p-8">
                                            <h3 className="text-xl font-bold text-white mb-4">Our Locations</h3>
                                            <div className="space-y-4">
                                                {locations.slice(0, 3).map((location) => (
                                                    <div key={location.id} className="pb-4 border-b border-white/10 last:border-b-0">
                                                        <h4 className="font-medium text-white">{location.name}</h4>
                                                        <p className="text-gray-300 text-sm">{location.address}</p>
                                                        <p className="text-gray-300 text-sm">{location.phone}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <Link href="/locations" className="block mt-6">
                                                <Button variant="outline" className="w-full border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        View All Locations
                                                    </span>
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
