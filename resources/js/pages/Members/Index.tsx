import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import AnimatedBackground from '@/components/AnimatedBackground';
import Section from '@/components/hub/Section';
import TileLink from '@/components/hub/TileLink';

type SharedUser = import('@/types').User;

interface RecentActivity {
    id: number;
    type: 'workout' | 'nutrition';
    title: string;
    date: string;
    duration?: string;
}

interface FeaturedContent {
    workouts: {
        id: number;
        title: string;
        image: string;
        duration: string;
        difficulty: string;
        type: string;
    }[];
}

interface MembersIndexProps {
    auth: { user: SharedUser };
    recentActivity: RecentActivity[];
    featuredContent: FeaturedContent;
    announcements?: { id: number; title: string; date: string; href?: string }[];
}

export default function MembersIndex({ auth, recentActivity, featuredContent, announcements = [] }: MembersIndexProps) {
    const user = auth.user as SharedUser & { profileImage?: string; membershipType?: string; memberSince?: string };

    const quickActions = [
        {
            title: 'Browse Workouts',
            description: 'Find your next workout routine',
            href: '/members/workouts',
            color: 'bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700',
        },
        {
            title: 'Nutrition Plans',
            description: 'Healthy recipes and meal plans',
            href: '/members/nutrition',
            color: 'bg-gradient-to-r from-green-700 to-green-800 hover:from-green-600 hover:to-green-700',
        },
        {
            title: 'Book PT Session',
            description: 'Schedule with a personal trainer',
            href: '/trainers',
            color: 'bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-600 hover:to-purple-700',
        },
        {
            title: 'Virtual Tours',
            description: 'Explore our gym facilities',
            href: '/tours',
            color: 'bg-gradient-to-r from-orange-700 to-orange-800 hover:from-orange-600 hover:to-orange-700',
        },
    ];

    return (
    <AppLayout auth={{ user }}>
            <Head title="Members Hub - ULTRAFLEX">
                <meta name="description" content="Welcome to your ULTRAFLEX Members Hub. Access workouts, nutrition plans, and track your fitness journey." />
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
                    {/* Header */}
                    <section className="relative py-16 overflow-hidden bg-black">
                        {/* Background Image */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')"
                            }}
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 via-black/70 to-red-800/90"></div>
                        
                        {/* Animated Particles */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {Array.from({ length: 20 }, (_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
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
                            {/* Responsive header: stack on small screens, row on md+ */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-0">
                                <div className="flex items-center space-x-6">
                                    <div className="w-20 h-20 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group hover:scale-105 transition-transform duration-300">
                                        {user.profileImage ? (
                                            <img 
                                                src={user.profileImage} 
                                                alt={user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-white text-2xl font-bold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-white">
                                        <h1 className="text-4xl font-bold mb-2">Welcome to <span className="ultraflex-ultra text-white">ULTRA</span><span className="ultraflex-flex text-red-600">FLEX</span>, {user.name}!</h1>
                                        <p className="text-xl text-gray-200">
                                            {user.membershipType} Member since {user.memberSince}
                                        </p>
                                    </div>
                                </div>
                                {/* Action buttons: stack on small screens, row on md+ */}
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-6 md:mt-0">
                                    <Link href="/" className="text-white hover:text-gray-300 transition-colors duration-300">
                                        <Button variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm w-full sm:w-auto">
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                Back to Home
                                            </span>
                                        </Button>
                                    </Link>
                                    <Link href="/logout" method="post" as="button" className="inline-block">
                                        <Button
                                            className="bg-red-700 text-white border border-red-700 hover:bg-red-800 hover:border-red-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm w-full sm:w-auto"
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                Log Out
                                            </span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Quick Actions */}
                    <Section title="Quick Actions" subtitle="Jump into key areas">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {quickActions.map((qa, i) => (
                                <TileLink key={i} title={qa.title} description={qa.description} href={qa.href} />
                            ))}
                        </div>
                    </Section>

                    {/* Activity & Featured */}
                    <section className="py-16 bg-black/20 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <div className="grid lg:grid-cols-3 gap-12">
                                <div className="lg:col-span-1">
                                    <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
                                    <div className="space-y-4">
                                        {recentActivity.map((activity) => (
                                            <div key={activity.id} className="flex items-center space-x-4 p-4 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 hover:border-red-700/30 transition-colors duration-300 group">
                                                <div className={"w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 bg-white/10 text-white border border-white/20"}>
                                                    <span className="text-sm font-bold">
                                                        {activity.type === 'workout' ? 'W' : 'N'}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-white group-hover:text-red-700 transition-colors duration-300">{activity.title}</h3>
                                                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                                                        <span>{activity.date}</span>
                                                        {activity.duration && (
                                                            <>
                                                                <span>•</span>
                                                                <span>{activity.duration}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/members/workouts" className="block mt-6">
                                        <Button variant="outline" className="w-full border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                View All Activity
                                            </span>
                                        </Button>
                                    </Link>
                                </div>

                                <div className="lg:col-span-2">
                                    {/* Available Workouts */}
                                    <div className="mb-12">
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-2xl font-bold text-white">Available Workouts</h2>
                                            <Link href="/members/workouts">
                                                <Button variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        View All
                                                    </span>
                                                </Button>
                                            </Link>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {featuredContent.workouts.map((workout) => (
                                                <Card key={workout.id} className="overflow-hidden hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                                    <div className="h-40 bg-gray-800 relative overflow-hidden">
                                                        <img 
                                                            src={workout.image} 
                                                            alt={workout.title}
                                                            className="w-full h-full object-cover"
                                                            loading="lazy"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                                        
                                                        {/* Duration badge */}
                                                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
                                                            <span className="text-white text-xs font-medium">{workout.duration}</span>
                                                        </div>
                                                    </div>
                                                    <CardContent className="p-4 bg-black/20 backdrop-blur-sm">
                                                        <h3 className="font-semibold text-white mb-3 group-hover:text-red-700 transition-colors duration-300">{workout.title}</h3>
                                                        <div className="flex items-center justify-between text-sm text-gray-300">
                                                            <span className="flex items-center">
                                                                <span className="text-red-700 mr-1 text-xs font-medium">TYPE:</span>
                                                                {workout.type}
                                                            </span>
                                                            <span className="px-2 py-1 rounded-full text-xs backdrop-blur-sm border bg-white/10 text-white border-white/20">
                                                                {workout.difficulty}
                                                            </span>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Announcements */}
                                    {announcements.length > 0 && (
                                        <div>
                                            <div className="flex items-center justify-between mb-6">
                                                <h2 className="text-2xl font-bold text-white">Announcements</h2>
                                                <Link href="/news">
                                                    <Button variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">View News</span>
                                                    </Button>
                                                </Link>
                                            </div>
                                            <div className="space-y-4">
                                                {announcements.map(a => (
                                                    <Card key={a.id} className="bg-black/40 backdrop-blur-md border border-white/10">
                                                        <CardContent className="p-4">
                                                            <div className="text-sm text-gray-400">{a.date}</div>
                                                            <div className="text-white font-medium">{a.title}</div>
                                                            {a.href && (
                                                                <Link href={a.href} className="text-red-500 text-sm hover:underline">Read more</Link>
                                                            )}
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Help & Support */}
                    <Section title="Need Help?" subtitle="We're here to support you">
                        <div className="grid md:grid-cols-3 gap-6">
                            <TileLink title="Personal Training" description="Get one-on-one guidance from our expert trainers" href="/trainers" tone="red" />
                            <TileLink title="Support Center" description="Find answers and get help" href="/contact" tone="green" />
                            <TileLink title="Visit a Location" description="Talk to our staff at any ULTRAFLEX location" href="/locations" tone="purple" />
                        </div>
                    </Section>
                </div>
            </div>
        </AppLayout>
    );
}