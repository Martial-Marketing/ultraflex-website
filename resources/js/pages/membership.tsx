import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

import AnimatedBackground from '@/components/AnimatedBackground';
import type { AppLayoutProps } from '@/layouts/app-layout';

const locations = [
    { name: 'Downtown ULTRAFLEX', href: 'https://secure.ashbournemanagement.co.uk/signupuk/index.aspx?fn=grbh2' },
    { name: 'Westside ULTRAFLEX', href: 'https://secure.ashbournemanagement.co.uk/signupuk/index.aspx?fn=grbh2' },
    { name: 'North ULTRAFLEX', href: 'https://secure.ashbournemanagement.co.uk/signupuk/index.aspx?fn=grbh2' }
];

export default function MembershipLocationSelector(props: AppLayoutProps) {
    return (
        <AppLayout {...props}>
            <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
                <AnimatedBackground variant="default" intensity="medium" />
                <div className="container mx-auto px-6 py-16 max-w-2xl relative z-10">
                    <Head title="Select Your Location" />
                    <h1 className="text-3xl font-bold mb-6 text-red-700 drop-shadow">Select Your Location</h1>
                    <p className="mb-4 text-gray-300">Choose your nearest ULTRAFLEX location to view membership options and sign up:</p>
                    <ul className="space-y-4">
                        {locations.map((loc) => (
                            <li key={loc.name}>
                                <Link href={loc.href} target="_blank" rel="noopener noreferrer" className="block px-6 py-4 bg-white/90 rounded-lg shadow hover:bg-red-50 border border-red-100 transition-all">
                                    <span className="text-lg font-semibold text-red-700">{loc.name}</span>
                                    <span className="ml-4 text-sm text-gray-500">Sign Up</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}
