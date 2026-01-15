import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { User as UserIcon, Mail, Calendar, MapPin, Phone } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { User } from '@/types';

interface AuthProps {
    user: User | null;
}

interface ProfileProps {
    auth: AuthProps;
}

export default function ProfileIndex({ auth }: ProfileProps) {
    const user = auth.user;

    if (!user) {
        return (
            <AppLayout auth={auth}>
                <Head title="Profile - ULTRAFLEX" />
                <div className="min-h-screen relative">
                    {/* Global Animated Background */}
                    <AnimatedBackground 
                        variant="gradient" 
                        intensity="medium"
                        className="z-0"
                    />
                    
                    {/* Content with higher z-index */}
                    <div className="relative z-10 flex items-center justify-center min-h-screen">
                        <div className="text-center text-white">
                            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                            <p className="text-gray-300">Please log in to view your profile.</p>
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout auth={auth}>
            <Head title="Profile - ULTRAFLEX" />
            
            <div className="min-h-screen relative">
                {/* Global Animated Background */}
                <AnimatedBackground 
                    variant="gradient" 
                    intensity="medium"
                    className="z-0"
                />
                
                {/* All content with higher z-index */}
                <div className="relative z-10 py-12">
                    <div className="container mx-auto px-6">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-white mb-4">
                                My <span className="text-red-700 animate-pulse">Profile</span>
                            </h1>
                            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                                Manage your ULTRAFLEX account information and preferences
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Profile Card */}
                                <div className="lg:col-span-1">
                                    <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-8 text-center shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                                        <div className="w-24 h-24 bg-gradient-to-br from-red-700/20 to-red-800/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-700/30 mx-auto mb-6 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                                            <UserIcon className="h-12 w-12 text-red-700" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
                                        <p className="text-red-700 font-medium mb-4 capitalize">
                                            {(user as any).user_role || 'Member'}
                                        </p>
                                        <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white border border-red-700/20 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transform hover:scale-105">
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                Edit Profile
                                            </span>
                                        </Button>
                                    </div>
                                </div>

                                {/* Profile Information */}
                                <div className="lg:col-span-2">
                                    <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-8 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                                        <h3 className="text-xl font-bold text-white mb-6">Profile Information</h3>
                                        
                                        <div className="space-y-6">
                                            {/* Email */}
                                            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                                                <Mail className="h-5 w-5 text-red-700" />
                                                <div>
                                                    <label className="text-gray-400 text-sm">Email Address</label>
                                                    <p className="text-white font-medium">{user.email}</p>
                                                </div>
                                            </div>

                                            {/* Member Since */}
                                            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                                                <Calendar className="h-5 w-5 text-red-700" />
                                                <div>
                                                    <label className="text-gray-400 text-sm">Member Since</label>
                                                    <p className="text-white font-medium">
                                                        {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Membership Type */}
                                            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                                                <UserIcon className="h-5 w-5 text-red-700" />
                                                <div>
                                                    <label className="text-gray-400 text-sm">Membership Type</label>
                                                    <p className="text-white font-medium capitalize">
                                                        {(user as any).user_role || 'Standard Member'}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Contact Information Placeholder */}
                                            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                                                <Phone className="h-5 w-5 text-red-700" />
                                                <div>
                                                    <label className="text-gray-400 text-sm">Phone Number</label>
                                                    <p className="text-gray-400 italic">Not provided</p>
                                                </div>
                                            </div>

                                            {/* Location Preference Placeholder */}
                                            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                                                <MapPin className="h-5 w-5 text-red-700" />
                                                <div>
                                                    <label className="text-gray-400 text-sm">Preferred Location</label>
                                                    <p className="text-gray-400 italic">Not selected</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-8 mt-8 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                                        <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Button 
                                                variant="outline" 
                                                className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-red-700 hover:border-red-700/50 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                    Update Password
                                                </span>
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-red-700 hover:border-red-700/50 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                    Privacy Settings
                                                </span>
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-red-700 hover:border-red-700/50 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                    Notification Preferences
                                                </span>
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-red-700 hover:border-red-700/50 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                    Billing Information
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
