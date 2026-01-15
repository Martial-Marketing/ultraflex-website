import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { UserPlus, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import AppLayout from '@/layouts/app-layout';

interface RegisterProps {
    auth?: {
        user: any;
    };
}

export default function Register({ auth }: RegisterProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register', {
            onSuccess: () => {
                reset();
            }
        });
    };

    return (
        <AppLayout auth={auth || { user: null }}>
            <Head title="Register - ULTRAFLEX">
                <meta name="description" content="Join ULTRAFLEX today and start your fitness journey. Create your account to access premium gym facilities and expert training." />
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
                    {/* Registration Form Section */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <div className="max-w-md mx-auto">
                                <Card className="p-8 bg-black/40 backdrop-blur-md border border-white/10">
                                    <div className="text-center mb-8">
                                        <h2 className="text-3xl font-bold mb-2">
                                            <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">Create</span>{' '}
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Your</span>{' '}
                                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Account</span>
                                        </h2>
                                        <p className="text-gray-300">Join thousands of members transforming their lives</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-white mb-2">
                                                <User className="h-4 w-4 inline mr-2" />
                                                Full Name
                                            </label>
                                            <Input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                                className={`bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:border-red-700/50 focus:ring-red-700/50 ${errors.name ? 'border-red-500' : ''}`}
                                                placeholder="Enter your full name"
                                            />
                                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white mb-2">
                                                <Mail className="h-4 w-4 inline mr-2" />
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
                                                <Lock className="h-4 w-4 inline mr-2" />
                                                Password
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    value={data.password}
                                                    onChange={(e) => setData('password', e.target.value)}
                                                    required
                                                    className={`bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:border-red-700/50 focus:ring-red-700/50 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                                                    placeholder="Create a strong password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                                >
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white mb-2">
                                                <Lock className="h-4 w-4 inline mr-2" />
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    value={data.password_confirmation}
                                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                                    required
                                                    className={`bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:border-red-700/50 focus:ring-red-700/50 pr-10 ${errors.password_confirmation ? 'border-red-500' : ''}`}
                                                    placeholder="Confirm your password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                                >
                                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                            {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>}
                                        </div>

                                        <Button 
                                            type="submit" 
                                            className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group py-3"
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                'Creating Account...'
                                            ) : (
                                                <>
                                                    <UserPlus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        Create Account
                                                    </span>
                                                </>
                                            )}
                                        </Button>
                                    </form>

                                    {/* Divider */}
                                    <div className="relative my-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-white/20"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm uppercase">
                                            <span className="bg-black/40 backdrop-blur-sm px-2 text-gray-400">Or continue with</span>
                                        </div>
                                    </div>

                                    {/* Google Auth */}
                                    <Button
                                        variant="outline"
                                        className="w-full border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm"
                                        onClick={() => {
                                            window.location.href = '/auth/google';
                                        }}
                                    >
                                        <svg className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                                            <path
                                                fill="#4285F4"
                                                d="M24 9.5c3.54 0 6.52 1.28 8.96 3.36l6.64-6.64C34.82 2.02 29.7 0 24 0 14.32 0 6.06 5.74 2.21 13.97l7.81 6.07C12.12 13.34 17.56 9.5 24 9.5z"
                                            />
                                            <path
                                                fill="#34A853"
                                                d="M46.04 24.5c0-1.47-.13-2.88-.37-4.25H24v8.5h12.54c-.56 2.87-2.07 5.32-4.26 7.05l6.7 6.7c4.31-3.98 6.77-9.79 6.77-16z"
                                            />
                                            <path
                                                fill="#FBBC05"
                                                d="M10.26 28.65c-.64-1.91-1-3.95-1-6.05s.36-4.14 1-6.05l-7.81-6.07C.79 13.17 0 18.44 0 24c0 5.56.79 10.83 2.21 15.52l8.05-6.18z"
                                            />
                                            <path
                                                fill="#EA4335"
                                                d="M24 48c5.7 0 10.82-2.02 14.7-5.45l-6.7-6.7c-1.96 1.31-4.42 2.07-7 2.07-6.44 0-11.88-3.84-14.04-9.35l-8.05 6.18C6.06 42.26 14.32 48 24 48z"
                                            />
                                        </svg>
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            Sign up with Google
                                        </span>
                                    </Button>

                                    {/* Login Link */}
                                    <div className="mt-6 p-4 bg-red-700/10 backdrop-blur-sm rounded-lg border border-red-700/30 text-center">
                                        <p className="text-sm text-gray-300">
                                            Already have an account?{' '}
                                            <a href="/login" className="text-red-700 hover:text-red-600 font-medium transition-colors duration-300">
                                                Sign in here
                                            </a>
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}