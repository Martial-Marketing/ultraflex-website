import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import AnimatedBackground from '@/components/AnimatedBackground'; // Import the animated background

interface Trainer {
    id: number;
    name: string;
    image: string;
    bio: string;
    detailedBio: string;
    specialties: string[];
    gender: 'Male' | 'Female' | 'Non-Binary';
    location: string;
    locationSlug: string;
    rating: number;
    reviewCount: number;
    experience: string;
    certifications: string[];
    qualifications: string[];
    philosophy: string;
    achievements: string[];
    socialMedia: {
        instagram?: string;
        facebook?: string;
        youtube?: string;
    };
    sessionTypes: {
        type: string;
        duration: string;
        price: number;
    }[];
    availability: {
        day: string;
        times: string[];
    }[];
    testimonials: {
        id: number;
        name: string;
        rating: number;
        comment: string;
        date: string;
        beforeAfter?: {
            before: string;
            after: string;
        };
    }[];
}

interface TrainerShowProps {
    trainer: Trainer;
    auth: {
        user: any;
    };
}

export default function TrainerShow({ trainer }: TrainerShowProps) {
    const [activeTab, setActiveTab] = useState('about');
    
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferred_session: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/trainers/${trainer.id}/contact`);
    };



    const tabs = [
        { id: 'about', label: 'About' },
        { id: 'sessions', label: 'Sessions & Pricing' },
        { id: 'testimonials', label: 'Testimonials' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <>
            <Head title={`${trainer.name} - Personal Trainer - UltraFlex`}>
                <meta name="description" content={`${trainer.name} is a certified personal trainer at UltraFlex specializing in ${trainer.specialties.join(', ')}. Book a session today!`} />
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
                    <section className="relative bg-gradient-to-r from-red-900/80 to-red-700/80 py-20 backdrop-blur-sm overflow-hidden">
                        {/* Hero particles */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {Array.from({ length: 20 }, (_, i) => (
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

                        <div className="container mx-auto px-6 relative z-10">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div className="text-white">
                                    <h1 className="text-5xl font-bold mb-4">{trainer.name}</h1>
                                    <p className="text-xl text-gray-200 mb-6">{trainer.experience}</p>
                                    
                                    <div className="text-gray-200 mb-6 group hover:text-red-700 transition-colors duration-300">
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            Based at {trainer.location}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {trainer.specialties.map((specialty, index) => (
                                            <span 
                                                key={index} 
                                                className="px-4 py-2 bg-red-700/20 backdrop-blur-sm text-white rounded-full border border-red-700/30 hover:bg-red-700/30 transition-colors duration-300"
                                            >
                                                {specialty}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <div className="relative group">
                                        <img 
                                            src={trainer.image} 
                                            alt={trainer.name}
                                            className="w-80 h-80 rounded-2xl object-cover shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute -bottom-6 -right-6 bg-black/60 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-red-700/30">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-red-700">{trainer.reviewCount}</div>
                                                <div className="text-sm text-gray-300">Happy Clients</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Navigation Tabs */}
                    <section className="bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
                        <div className="container mx-auto px-6">
                            <nav className="flex space-x-8 overflow-x-auto">
                                {tabs.map((tab) => {
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`py-4 px-2 border-b-2 transition-all duration-300 whitespace-nowrap group ${
                                                activeTab === tab.id
                                                    ? 'border-red-700 text-red-700'
                                                    : 'border-transparent text-gray-300 hover:text-red-700 hover:border-red-700/30'
                                            }`}
                                        >
                                            <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </section>

                    {/* Tab Content */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            {/* About Tab */}
                            {activeTab === 'about' && (
                                <div className="grid lg:grid-cols-3 gap-12">
                                    <div className="lg:col-span-2 space-y-8">
                                        {/* Bio */}
                                        <Card className="p-8 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-colors duration-300">
                                            <h2 className="text-2xl font-bold text-white mb-6">About {trainer.name}</h2>
                                            <p className="text-gray-300 leading-relaxed mb-6">{trainer.detailedBio}</p>
                                            
                                            {trainer.philosophy && (
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white mb-3">Training Philosophy</h3>
                                                    <div className="bg-red-700/10 border border-red-700/20 rounded-lg p-4">
                                                        <p className="text-gray-300 leading-relaxed italic">"{trainer.philosophy}"</p>
                                                    </div>
                                                </div>
                                            )}
                                        </Card>

                                        {/* Achievements */}
                                        {trainer.achievements.length > 0 && (
                                            <Card className="p-8 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-colors duration-300">
                                                <h2 className="text-2xl font-bold text-white mb-6">Achievements</h2>
                                                <ul className="space-y-3">
                                                    {trainer.achievements.map((achievement, index) => (
                                                        <li key={index} className="group hover:text-red-700 transition-colors duration-300">
                                                            <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{achievement}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Card>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        {/* Qualifications */}
                                        <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-colors duration-300">
                                            <h3 className="text-lg font-bold text-white mb-4">Qualifications</h3>
                                            <div className="space-y-3">
                                                {trainer.qualifications.map((qual, index) => (
                                                    <div key={index} className="group hover:text-red-700 transition-colors duration-300">
                                                        <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{qual}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </Card>

                                        {/* Quick Contact */}
                                        <Card className="p-6 bg-red-700/10 backdrop-blur-md border border-red-700/30 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-red-700/5 to-red-800/5"></div>
                                            <div className="relative z-10">
                                                <h3 className="text-lg font-bold text-white mb-4">Ready to Start?</h3>
                                                <p className="text-gray-300 mb-4">
                                                    Book a consultation with {trainer.name} today!
                                                </p>
                                                <Button 
                                                    className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group"
                                                    onClick={() => setActiveTab('contact')}
                                                >
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        Contact {trainer.name}
                                                    </span>
                                                </Button>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            )}

                            {/* Sessions & Pricing Tab */}
                            {activeTab === 'sessions' && (
                                <div className="grid lg:grid-cols-2 gap-12">
                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-8">Session Types & Pricing</h2>
                                        <div className="space-y-6">
                                            {trainer.sessionTypes.map((session, index) => (
                                                <Card key={index} className="p-6 hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <h3 className="text-xl font-semibold text-white group-hover:text-red-700 transition-colors duration-300">{session.type}</h3>
                                                            <p className="text-gray-300 mt-1">
                                                                {session.duration}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-2xl font-bold text-red-700">£{session.price}</div>
                                                            <div className="text-sm text-gray-400">per session</div>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" className="w-full bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-red-700/20 hover:border-red-700/50 transition-all duration-300 group">
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                            Book This Session
                                                        </span>
                                                    </Button>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-8">Availability</h2>
                                        <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10">
                                            <div className="space-y-4">
                                                {trainer.availability.map((day, index) => (
                                                    <div key={index} className="flex justify-between items-center py-3 border-b border-white/10 last:border-b-0">
                                                        <span className="font-medium text-white">{day.day}</span>
                                                        <div className="flex flex-wrap gap-2">
                                                            {day.times.map((time, timeIndex) => (
                                                                <span 
                                                                    key={timeIndex}
                                                                    className="px-2 py-1 bg-red-700/20 text-red-700 text-sm rounded backdrop-blur-sm border border-red-700/30"
                                                                >
                                                                    {time}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <div className="mt-6 p-4 bg-yellow-600/20 backdrop-blur-sm rounded-lg border border-yellow-600/30">
                                                <p className="text-sm text-yellow-200">
                                                    <strong>Note:</strong> Availability shown is general schedule. 
                                                    Specific times may vary. Please contact for exact availability.
                                                </p>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            )}

                            {/* Testimonials Tab */}
                            {activeTab === 'testimonials' && (
                                <div>
                                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                                        What Clients Say About {trainer.name}
                                    </h2>
                                    
                                    <div className="grid md:grid-cols-2 gap-8">
                                        {trainer.testimonials.map((testimonial) => (
                                            <Card key={testimonial.id} className="p-6 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group">
                                                <div className="flex items-center justify-start mb-4">
                                                    <span className="text-sm text-gray-400">{testimonial.date}</span>
                                                </div>
                                                
                                                <p className="text-gray-300 mb-4 italic group-hover:text-gray-200 transition-colors duration-300">"{testimonial.comment}"</p>
                                                <p className="font-semibold text-white">- {testimonial.name}</p>
                                                
                                                {testimonial.beforeAfter && (
                                                    <div className="mt-6 grid grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="text-sm font-medium text-white mb-2">Before</p>
                                                            <img 
                                                                src={testimonial.beforeAfter.before} 
                                                                alt="Before transformation"
                                                                className="w-full h-32 object-cover rounded-lg border border-white/10"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-white mb-2">After</p>
                                                            <img 
                                                                src={testimonial.beforeAfter.after} 
                                                                alt="After transformation"
                                                                className="w-full h-32 object-cover rounded-lg border border-white/10"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Contact Tab */}
                            {activeTab === 'contact' && (
                                <div className="grid lg:grid-cols-2 gap-12">
                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-8">Get In Touch</h2>
                                        
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
                                                    />
                                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-white mb-2">
                                                        Email
                                                    </label>
                                                    <Input
                                                        type="email"
                                                        value={data.email}
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        required
                                                        className={`bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:border-red-700/50 focus:ring-red-700/50 ${errors.email ? 'border-red-500' : ''}`}
                                                    />
                                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-white mb-2">
                                                        Phone Number
                                                    </label>
                                                    <Input
                                                        type="tel"
                                                        value={data.phone}
                                                        onChange={(e) => setData('phone', e.target.value)}
                                                        className={`bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:border-red-700/50 focus:ring-red-700/50 ${errors.phone ? 'border-red-500' : ''}`}
                                                    />
                                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-white mb-2">
                                                        Preferred Session Type
                                                    </label>
                                                    <select
                                                        value={data.preferred_session}
                                                        onChange={(e) => setData('preferred_session', e.target.value)}
                                                        className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 bg-black/20 backdrop-blur-sm text-white"
                                                    >
                                                        <option value="" className="bg-black text-white">Select a session type</option>
                                                        {trainer.sessionTypes.map((session, index) => (
                                                            <option key={index} value={session.type} className="bg-black text-white">
                                                                {session.type} - £{session.price}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-white mb-2">
                                                        Message
                                                    </label>
                                                    <Textarea
                                                        value={data.message}
                                                        onChange={(e) => setData('message', e.target.value)}
                                                        rows={4}
                                                        placeholder="Tell us about your fitness goals and any questions you have..."
                                                        required
                                                        className={`bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:border-red-700/50 focus:ring-red-700/50 ${errors.message ? 'border-red-500' : ''}`}
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
                                    </div>

                                    <div className="space-y-6">
                                        <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10">
                                            <h3 className="text-xl font-bold text-white mb-4">Why Choose {trainer.name}?</h3>
                                            <div className="space-y-4">
                                                <div className="group hover:text-red-700 transition-colors duration-300">
                                                    <div>
                                                        <p className="font-medium text-white group-hover:text-red-700 transition-colors duration-300">Certified Professional</p>
                                                        <p className="text-sm text-gray-400">Multiple certifications and qualifications</p>
                                                    </div>
                                                </div>
                                                <div className="group hover:text-red-700 transition-colors duration-300">
                                                    <div>
                                                        <p className="font-medium text-white group-hover:text-red-700 transition-colors duration-300">Proven Results</p>
                                                        <p className="text-sm text-gray-400">{trainer.reviewCount}+ satisfied clients</p>
                                                    </div>
                                                </div>
                                                <div className="group hover:text-red-700 transition-colors duration-300">
                                                    <div>
                                                        <p className="font-medium text-white group-hover:text-red-700 transition-colors duration-300">Personalized Approach</p>
                                                        <p className="text-sm text-gray-400">Tailored programs for your goals</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>

                                        <Card className="p-6 bg-green-700/10 backdrop-blur-md border border-green-700/30">
                                            <h3 className="text-lg font-bold text-white mb-4">Response Time</h3>
                                            <p className="text-gray-300 mb-4">
                                                {trainer.name} typically responds to enquiries within 24 hours.
                                            </p>
                                            <div className="text-green-400">
                                                <span className="text-sm font-medium">Usually responds quickly</span>
                                            </div>
                                        </Card>

                                        {/* Social Media */}
                                        {(trainer.socialMedia.instagram || trainer.socialMedia.facebook || trainer.socialMedia.youtube) && (
                                            <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10">
                                                <h3 className="text-lg font-bold text-white mb-4">Follow {trainer.name}</h3>
                                                <div className="space-y-3">
                                                    {trainer.socialMedia.instagram && (
                                                        <a 
                                                            href={trainer.socialMedia.instagram}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center space-x-3 text-gray-300 hover:text-pink-500 transition-colors duration-300 group"
                                                        >
                                                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                                                <span className="text-white text-sm font-bold">IG</span>
                                                            </div>
                                                            <span className="group-hover:translate-x-1 transition-transform duration-300">Instagram</span>
                                                        </a>
                                                    )}
                                                    {trainer.socialMedia.facebook && (
                                                        <a 
                                                            href={trainer.socialMedia.facebook}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center space-x-3 text-gray-300 hover:text-blue-500 transition-colors duration-300 group"
                                                        >
                                                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                                                <span className="text-white text-sm font-bold">FB</span>
                                                            </div>
                                                            <span className="group-hover:translate-x-1 transition-transform duration-300">Facebook</span>
                                                        </a>
                                                    )}
                                                    {trainer.socialMedia.youtube && (
                                                        <a 
                                                            href={trainer.socialMedia.youtube}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center space-x-3 text-gray-300 hover:text-red-500 transition-colors duration-300 group"
                                                        >
                                                            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                                                                <span className="text-white text-sm font-bold">YT</span>
                                                            </div>
                                                            <span className="group-hover:translate-x-1 transition-transform duration-300">YouTube</span>
                                                        </a>
                                                    )}
                                                </div>
                                            </Card>
                                        )}

                                        {/* Location Info */}
                                        <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/10">
                                            <h3 className="text-lg font-bold text-white mb-4">Training Location</h3>
                                            <div className="mb-4 group hover:text-red-700 transition-colors duration-300">
                                                <div>
                                                    <p className="font-medium text-white group-hover:text-red-700 transition-colors duration-300">{trainer.location}</p>
                                                    <p className="text-sm text-gray-400">Primary training location</p>
                                                </div>
                                            </div>
                                            <Link href={`/locations/${trainer.locationSlug}`}>
                                                <Button variant="outline" className="w-full bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-red-700/20 hover:border-red-700/50 transition-all duration-300 group">
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        View Gym Details
                                                    </span>
                                                </Button>
                                            </Link>
                                        </Card>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Bottom CTA */}
                    <section className="py-16 bg-gradient-to-r from-red-900/80 to-red-700/80 backdrop-blur-sm relative overflow-hidden">
                        {/* CTA particles */}
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
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Ready to Transform Your Fitness Journey?
                            </h2>
                            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                                Join the many clients who have achieved their fitness goals with {trainer.name}'s expert guidance.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button 
                                    size="lg" 
                                    className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group"
                                    onClick={() => setActiveTab('contact')}
                                >
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                        Book Consultation
                                    </span>
                                </Button>
                                <Link href="/trainers">
                                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-red-700/20 hover:border-red-700/50 transition-all duration-300 group">
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            View All Trainers
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}