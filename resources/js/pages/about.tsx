import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

import AnimatedBackground from '@/components/AnimatedBackground';
import type { AppLayoutProps } from '@/layouts/app-layout';

export default function About(props: AppLayoutProps) {
    return (
        <AppLayout {...props}>
            <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
                <AnimatedBackground variant="default" intensity="medium" />
                <div className="container mx-auto px-6 py-16 max-w-3xl relative z-10">
                    <Head title="About Us" />
                    <h1 className="text-4xl font-bold mb-6 text-red-700 drop-shadow">About UltraFlex</h1>
                    <p className="mb-4 text-lg text-gray-200">
                        Welcome to UltraFlex – where your fitness journey becomes an experience. Since our founding, we’ve been committed to building more than just gyms; we build communities that inspire, support, and empower every member.
                    </p>
                    <p className="mb-4 text-gray-300">
                        Our state-of-the-art facilities feature the latest equipment, innovative group classes, and a team of passionate trainers dedicated to helping you reach your goals. Whether you’re training for your first 5K, building strength, or seeking a healthier lifestyle, UltraFlex is your home for transformation.
                    </p>
                    <p className="mb-4 text-gray-300">
                        We believe fitness should be accessible, motivating, and fun. That’s why we offer flexible memberships, expert coaching, and a welcoming environment for all ages and abilities. Join us and discover the UltraFlex difference – where every member matters and every goal is possible.
                    </p>
                    <ul className="list-disc pl-6 mb-4 text-gray-400">
                        <li>Multiple locations across the region</li>
                        <li>Personal training and nutrition support</li>
                        <li>Modern equipment and functional training zones</li>
                        <li>Group classes for all levels</li>
                        <li>Friendly, expert staff</li>
                    </ul>
                    <div className="mt-8">
                        <Link href="/locations" className="text-red-400 hover:underline font-semibold">Find a Location</Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
