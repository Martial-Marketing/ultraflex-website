import React from 'react';
import { Link } from '@inertiajs/react';
import { 
    MapPin, 
    Phone, 
    Mail, 
    Facebook, 
    Twitter, 
    Instagram, 
    Youtube,
    Dumbbell,
    Heart,
    Award,
    Users,
    ChevronRight,
    Clock
} from 'lucide-react';

interface FooterProps {
    className?: string;
}

export default function AnimatedFooter({ className = '' }: FooterProps) {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'About Us', href: '/about' },
        { name: 'Membership', href: '/membership' },
        { name: 'Personal Training', href: '/trainers' },
        { name: 'Classes', href: '/classes' },
        { name: 'Locations', href: '/locations' },
        { name: 'Contact', href: '/contact' }
    ];

    const services = [
        { name: 'Gym Equipment', href: '/equipment', icon: Dumbbell },
        { name: 'Nutrition Plans', href: '/nutrition', icon: Heart },
        { name: 'Virtual Tours', href: '/tours', icon: Award },
        { name: 'Group Classes', href: '/classes', icon: Users }
    ];

    const locations = [
        { name: 'Downtown UltraFlex', address: '123 Main St, City Center', phone: '(555) 123-4567' },
        { name: 'Westside UltraFlex', address: '456 West Ave, Westside', phone: '(555) 234-5678' },
        { name: 'North UltraFlex', address: '789 North Blvd, Uptown', phone: '(555) 345-6789' }
    ];

    const socialLinks = [
        { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-500' },
        { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-400' },
        { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500' },
        { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-500' }
    ];

    return (
        <footer className={`relative bg-black/60 backdrop-blur-md border-t border-white/10 ${className}`}>
            {/* Animated particles overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 10 }, (_, i) => (
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

            <div className="relative z-10">
                {/* Main Footer Content */}
                <div className="container mx-auto px-6 py-8">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
                        {/* Brand Section */}
                        <div className="lg:col-span-1">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-red-700/20 to-red-800/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-700/30">
                                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-red-800">
                                        U
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">
                                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Ultra</span>
                                        <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Flex</span>
                                    </h3>
                                    <p className="text-red-700 text-sm">Premium Fitness</p>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                                Transform your fitness journey with state-of-the-art equipment, 
                                expert trainers, and a supportive community.
                            </p>
                            
                            {/* Social Media Links */}
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => {
                                    const IconComponent = social.icon;
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-white/20 border border-white/10 ${social.color}`}
                                            aria-label={social.name}
                                        >
                                            <IconComponent className="h-5 w-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="lg:col-span-1">
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                                <div className="w-1 h-4 bg-gradient-to-b from-red-700 to-red-800 rounded-full mr-2"></div>
                                Quick Links
                            </h4>
                            <ul className="space-y-2">
                                {quickLinks.slice(0, 4).map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="flex items-center text-gray-300 hover:text-red-900 transition-colors duration-300 group"
                                        >
                                            <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                {link.name}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div className="lg:col-span-1">
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                                <div className="w-1 h-4 bg-gradient-to-b from-red-700 to-red-800 rounded-full mr-2"></div>
                                Services
                            </h4>
                            <ul className="space-y-2">
                                {services.map((service) => {
                                    return (
                                        <li key={service.name}>
                                            <Link
                                                href={service.href}
                                                className="flex items-center text-gray-300 hover:text-red-900 transition-colors duration-300 group"
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                    {service.name}
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="lg:col-span-1">
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                                <div className="w-1 h-4 bg-gradient-to-b from-red-700 to-red-800 rounded-full mr-2"></div>
                                Contact
                            </h4>
                            
                            {/* Contact Details */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4 text-red-700" />
                                    <a href="mailto:info@ultraflex.com" className="text-gray-300 hover:text-red-700 transition-colors text-sm">
                                        info@ultraflex.com
                                    </a>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4 text-red-700" />
                                    <a href="tel:+1555123456" className="text-gray-300 hover:text-red-700 transition-colors text-sm">
                                        (555) 123-4567
                                    </a>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4 text-red-700" />
                                    <Link href="/locations" className="text-gray-300 hover:text-red-700 transition-colors text-sm">
                                        Find Locations
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="border-t border-white/10">
                    <div className="container mx-auto px-6 py-6">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
                            <div className="text-center md:text-left">
                                <h4 className="text-lg font-semibold text-white mb-1">Stay Updated</h4>
                                <p className="text-gray-300 text-sm">Get fitness tips and updates</p>
                            </div>
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent text-sm"
                                />
                                <button className="px-4 py-2 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-sm">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 bg-black/40 backdrop-blur-sm">
                    <div className="container mx-auto px-6 py-4">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
                            <div className="text-gray-400 text-sm">
                                © {currentYear} UltraFlex. All rights reserved.
                            </div>
                            <div className="flex flex-wrap items-center space-x-4 text-xs">
                                <Link href="/privacy" className="text-gray-400 hover:text-red-700 transition-colors">
                                    Privacy
                                </Link>
                                <Link href="/terms" className="text-gray-400 hover:text-red-700 transition-colors">
                                    Terms
                                </Link>
                                <Link href="/cookies" className="text-gray-400 hover:text-red-700 transition-colors">
                                    Cookies
                                </Link>
                                <Link href="/accessibility" className="text-gray-400 hover:text-red-700 transition-colors">
                                    Accessibility
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back to Top Button */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 backdrop-blur-sm border border-red-700/20"
                    aria-label="Back to top"
                >
                    <ChevronRight className="h-5 w-5 transform -rotate-90" />
                </button>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </footer>
    );
}