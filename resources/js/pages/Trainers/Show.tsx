import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';

import AnimatedBackground from '@/components/AnimatedBackground'; // Import the animated background

interface Trainer {
    id: number;
    slug: string;
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
    contact: {
        instagram?: string;
        facebook?: string;
        phone?: string;
        email?: string;
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

export default function TrainerShow({ trainer, auth }: TrainerShowProps) {
    const [activeTab, setActiveTab] = useState('about');

    const tabs = [
        { id: 'about', label: 'About' },
    ];

    return (
        <AppLayout auth={auth}>
            <Head title={`${trainer.name} - Personal Trainer - ULTRAFLEX`}>
                <meta name="description" content={`${trainer.name} is a certified personal trainer at ULTRAFLEX specializing in ${trainer.specialties.join(', ')}. Book a session today!`} />
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
                                backgroundImage: 'url(https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1920&h=1080&fit=crop&q=80)'
                            }}
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-red-900/70 to-black/80 backdrop-blur-sm" />
                        
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
                                            <h2 className="text-2xl font-bold mb-6">
                                                <span className="text-white animate-pulse">About</span>{' '}
                                                <span className="text-red-700 animate-pulse">{trainer.name}</span>
                                            </h2>
                                            <p className="text-gray-300 leading-relaxed mb-6">{trainer.detailedBio}</p>
                                            
                                            {/* Training Philosophy section removed by request */}
                                        </Card>

                                        {/* Achievements */}
                                        {trainer.achievements.length > 0 && (
                                            <Card className="p-8 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-colors duration-300">
                                                <h2 className="text-2xl font-bold mb-6">
                                                    <span className="text-red-700 animate-pulse">Achievements</span>
                                                </h2>
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
                                        {/* Contact Information */}
                                        <Card className="p-6 bg-red-700/10 backdrop-blur-md border border-red-700/30 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-red-700/5 to-red-800/5"></div>
                                            <div className="relative z-10">
                                                <h3 className="text-lg font-bold mb-4">
                                                    <span className="text-white animate-pulse">Contact</span>{' '}
                                                    <span className="text-red-700 animate-pulse">{trainer.name}</span>
                                                </h3>
                                                <div className="space-y-3">
                                                    {trainer.contact?.phone && (
                                                        <a 
                                                            href={`tel:${trainer.contact.phone}`}
                                                            className="flex items-center gap-3 p-3 rounded-lg bg-black/20 hover:bg-red-700/20 transition-all duration-300 group"
                                                        >
                                                            <div className="w-10 h-10 rounded-full bg-red-700/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                                <svg className="w-5 h-5 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                                </svg>
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="text-xs text-gray-400">Phone</p>
                                                                <p className="text-white group-hover:text-red-700 transition-colors duration-300">{trainer.contact.phone}</p>
                                                            </div>
                                                        </a>
                                                    )}
                                                    {trainer.contact?.email && (
                                                        <a 
                                                            href={`mailto:${trainer.contact.email}`}
                                                            className="flex items-center gap-3 p-3 rounded-lg bg-black/20 hover:bg-red-700/20 transition-all duration-300 group"
                                                        >
                                                            <div className="w-10 h-10 rounded-full bg-red-700/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                                <svg className="w-5 h-5 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="text-xs text-gray-400">Email</p>
                                                                <p className="text-white group-hover:text-red-700 transition-colors duration-300 text-sm break-all">{trainer.contact.email}</p>
                                                            </div>
                                                        </a>
                                                    )}
                                                    {trainer.contact?.instagram && (
                                                        <a 
                                                            href={trainer.contact.instagram}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-3 p-3 rounded-lg bg-black/20 hover:bg-red-700/20 transition-all duration-300 group"
                                                        >
                                                            <div className="w-10 h-10 rounded-full bg-red-700/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                                <svg className="w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                                                </svg>
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="text-xs text-gray-400">Instagram</p>
                                                                <p className="text-white group-hover:text-red-700 transition-colors duration-300">@{trainer.contact.instagram.split('/').pop()}</p>
                                                            </div>
                                                        </a>
                                                    )}
                                                    {trainer.contact?.facebook && (
                                                        <a 
                                                            href={trainer.contact.facebook}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-3 p-3 rounded-lg bg-black/20 hover:bg-red-700/20 transition-all duration-300 group"
                                                        >
                                                            <div className="w-10 h-10 rounded-full bg-red-700/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                                <svg className="w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                                                </svg>
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="text-xs text-gray-400">Facebook</p>
                                                                <p className="text-white group-hover:text-red-700 transition-colors duration-300">View Profile</p>
                                                            </div>
                                                        </a>
                                                    )}
                                                    {!trainer.contact?.phone && !trainer.contact?.email && !trainer.contact?.instagram && !trainer.contact?.facebook && (
                                                        <p className="text-gray-400 text-sm">Contact information coming soon</p>
                                                    )}
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}