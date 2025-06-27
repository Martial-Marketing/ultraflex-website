import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedBackground from '@/components/AnimatedBackground'; // Import the animated background

interface User {
    id: number;
    name: string;
    email: string;
    memberSince: string;
    membershipType: string;
    profileImage?: string;
}

interface WorkoutStats {
    totalWorkouts: number;
    thisWeek: number;
    favoriteWorkout: string;
    totalHours: number;
}

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
    nutrition: {
        id: number;
        title: string;
        image: string;
        prepTime: string;
        calories: number;
        goal: string;
    }[];
}

interface MembersIndexProps {
    auth: {
        user: User;
    };
    workoutStats: WorkoutStats;
    recentActivity: RecentActivity[];
    featuredContent: FeaturedContent;
}

export default function MembersIndex({ auth, workoutStats, recentActivity, featuredContent }: MembersIndexProps) {
    const user = auth.user;

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

    const statsCards = [
        {
            title: 'Total Workouts',
            value: workoutStats.totalWorkouts,
            subtitle: 'All time',
            color: 'text-red-700',
            bgColor: 'bg-red-700/20 backdrop-blur-sm border border-red-700/30',
        },
        {
            title: 'This Week',
            value: workoutStats.thisWeek,
            subtitle: 'Workouts completed',
            color: 'text-green-400',
            bgColor: 'bg-green-700/20 backdrop-blur-sm border border-green-700/30',
        },
        {
            title: 'Total Hours',
            value: workoutStats.totalHours,
            subtitle: 'Time spent training',
            color: 'text-purple-400',
            bgColor: 'bg-purple-700/20 backdrop-blur-sm border border-purple-700/30',
        },
        {
            title: 'Favorite Type',
            value: workoutStats.favoriteWorkout,
            subtitle: 'Most completed',
            color: 'text-orange-400',
            bgColor: 'bg-orange-700/20 backdrop-blur-sm border border-orange-700/30',
            isString: true,
        },
    ];

    return (
        <>
            <Head title="Members Hub - UltraFlex">
                <meta name="description" content="Welcome to your UltraFlex Members Hub. Access workouts, nutrition plans, and track your fitness journey." />
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
                    <section className="bg-gradient-to-r from-red-900/80 to-red-700/80 py-16 backdrop-blur-sm relative overflow-hidden">
                        {/* Header particles */}
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

                        <div className="container mx-auto px-6 relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                    <div className="w-20 h-20 rounded-full overflow-hidden bg-red-700/20 backdrop-blur-sm flex items-center justify-center border border-red-700/30 group hover:scale-105 transition-transform duration-300">
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
                                        <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
                                        <p className="text-xl text-gray-200">
                                            {user.membershipType} Member since {user.memberSince}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Link href="/" className="text-white hover:text-gray-300 transition-colors duration-300">
                                        <Button variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                Back to Home
                                            </span>
                                        </Button>
                                    </Link>
                                    <Link href="/logout" method="post" as="button" className="inline-block">
                                        <Button variant="outline" className="border-red-500/50 bg-red-500/10 text-red-400 hover:text-white hover:bg-red-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
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
                    <section className="py-8 -mt-8 relative z-10">
                        <div className="container mx-auto px-6">
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {quickActions.map((action, index) => {
                                    return (
                                        <Link key={index} href={action.href}>
                                            <Card className="hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                                <CardContent className="p-6 text-center">
                                                    <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition-all duration-300`}>
                                                        <div className="text-white text-lg font-bold">
                                                            {action.title.charAt(0)}
                                                        </div>
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">{action.title}</h3>
                                                    <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">{action.description}</p>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* Stats Overview */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-white mb-8">Your Progress</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {statsCards.map((stat, index) => {
                                    return (
                                        <Card key={index} className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group">
                                            <CardContent className="p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                                        <div className={`text-white text-lg font-bold`}>
                                                            {stat.title.charAt(0)}
                                                        </div>
                                                    </div>
                                                    <div className="text-green-400 text-xs font-semibold">+</div>
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-white mb-1 group-hover:text-red-700 transition-colors duration-300">
                                                        {stat.isString ? stat.value : `${stat.value}`}
                                                    </div>
                                                    <div className="text-sm text-gray-400">{stat.subtitle}</div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* Recent Activity */}
                    <section className="py-16 bg-black/20 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <div className="grid lg:grid-cols-3 gap-12">
                                <div className="lg:col-span-1">
                                    <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
                                    <div className="space-y-4">
                                        {recentActivity.map((activity) => (
                                            <div key={activity.id} className="flex items-center space-x-4 p-4 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 hover:border-red-700/30 transition-colors duration-300 group">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                                                    activity.type === 'workout' ? 'bg-red-700/20 text-red-700 border border-red-700/30' : 'bg-green-700/20 text-green-400 border border-green-700/30'
                                                }`}>
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
                                    {/* Featured Workouts */}
                                    <div className="mb-12">
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-2xl font-bold text-white">Featured Workouts</h2>
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
                                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                            loading="lazy"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                        
                                                        {/* Duration badge */}
                                                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 border border-white/10">
                                                            <span className="text-white text-xs font-medium">{workout.duration}</span>
                                                        </div>

                                                        {/* Play overlay */}
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            <div className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white p-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 border border-red-700/20 backdrop-blur-sm">
                                                                <span className="text-sm font-bold">PLAY</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <CardContent className="p-4 bg-black/20 backdrop-blur-sm">
                                                        <h3 className="font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">{workout.title}</h3>
                                                        <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
                                                            <span className="flex items-center">
                                                                <span className="text-red-700 mr-1 text-xs">TYPE:</span>
                                                                {workout.type}
                                                            </span>
                                                            <span className={`px-2 py-1 rounded-full text-xs backdrop-blur-sm border ${
                                                                workout.difficulty === 'Beginner' ? 'bg-green-700/20 text-green-400 border-green-700/30' :
                                                                workout.difficulty === 'Intermediate' ? 'bg-yellow-700/20 text-yellow-400 border-yellow-700/30' :
                                                                'bg-red-700/20 text-red-700 border-red-700/30'
                                                            }`}>
                                                                {workout.difficulty}
                                                            </span>
                                                        </div>
                                                        <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group">
                                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                                Start Workout
                                                            </span>
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Featured Nutrition */}
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-2xl font-bold text-white">Featured Nutrition</h2>
                                            <Link href="/members/nutrition">
                                                <Button variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        View All
                                                    </span>
                                                </Button>
                                            </Link>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {featuredContent.nutrition.map((recipe) => (
                                                <Card key={recipe.id} className="overflow-hidden hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                                    <div className="h-40 bg-gray-800 relative overflow-hidden">
                                                        <img 
                                                            src={recipe.image} 
                                                            alt={recipe.title}
                                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                            loading="lazy"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                        
                                                        {/* Prep time badge */}
                                                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 border border-white/10">
                                                            <span className="text-white text-xs font-medium">{recipe.prepTime}</span>
                                                        </div>

                                                        {/* View overlay */}
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            <div className="bg-gradient-to-r from-green-700 to-green-800 hover:from-green-600 hover:to-green-700 text-white px-3 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-green-700/20 backdrop-blur-sm flex items-center text-sm">
                                                                View Recipe
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <CardContent className="p-4 bg-black/20 backdrop-blur-sm">
                                                        <h3 className="font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">{recipe.title}</h3>
                                                        <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
                                                            <span className="flex items-center">
                                                                <span className="text-green-400 mr-1 text-xs">CAL:</span>
                                                                {recipe.calories}
                                                            </span>
                                                            <span className="px-2 py-1 bg-green-700/20 text-green-400 rounded-full text-xs backdrop-blur-sm border border-green-700/30">
                                                                {recipe.goal}
                                                            </span>
                                                        </div>
                                                        <Button variant="outline" className="w-full border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                                View Recipe
                                                            </span>
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Goals & Achievements */}
                    <section className="py-16 bg-black/10 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-white text-center mb-12">Your Fitness Journey</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                <Card className="p-6 text-center bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group">
                                    <div className="w-16 h-16 bg-red-700/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-red-700/30 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-red-700 text-lg font-bold">G</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">Set Goals</h3>
                                    <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">
                                        Define your fitness objectives and track your progress
                                    </p>
                                    <Button variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">Set New Goal</span>
                                    </Button>
                                </Card>

                                <Card className="p-6 text-center bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group">
                                    <div className="w-16 h-16 bg-green-700/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-green-700/30 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-green-400 text-lg font-bold">P</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">Track Progress</h3>
                                    <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">
                                        Monitor your workouts, nutrition, and achievements
                                    </p>
                                    <Button variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">View Progress</span>
                                    </Button>
                                </Card>

                                <Card className="p-6 text-center bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group">
                                    <div className="w-16 h-16 bg-yellow-700/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-700/30 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-yellow-400 text-lg font-bold">R</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">Earn Rewards</h3>
                                    <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">
                                        Achieve milestones and unlock exclusive benefits
                                    </p>
                                    <Button variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">View Rewards</span>
                                    </Button>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* Help & Support */}
                    <section className="py-16 bg-black/20 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <div className="max-w-4xl mx-auto text-center">
                                <h2 className="text-3xl font-bold text-white mb-6">Need Help?</h2>
                                <p className="text-xl text-gray-300 mb-8">
                                    Our team is here to support you on your fitness journey
                                </p>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <Link href="/trainers">
                                        <Card className="p-6 hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 cursor-pointer bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                            <div className="w-12 h-12 bg-red-700/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-red-700/30 group-hover:scale-110 transition-transform duration-300">
                                                <span className="text-red-700 text-xl font-bold">PT</span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">Personal Training</h3>
                                            <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">Get one-on-one guidance from our expert trainers</p>
                                        </Card>
                                    </Link>

                                    <Link href="/contact">
                                        <Card className="p-6 hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 cursor-pointer bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                            <div className="w-12 h-12 bg-green-700/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-green-700/30 group-hover:scale-110 transition-transform duration-300">
                                                <span className="text-green-400 text-xl font-bold">?</span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">Support Center</h3>
                                            <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">Find answers to common questions and get help</p>
                                        </Card>
                                    </Link>

                                    <Link href="/locations">
                                        <Card className="p-6 hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 cursor-pointer bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                            <div className="w-12 h-12 bg-purple-700/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-700/30 group-hover:scale-110 transition-transform duration-300">
                                                <span className="text-purple-400 text-lg font-bold">L</span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">Visit a Location</h3>
                                            <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">Talk to our staff at any UltraFlex location</p>
                                        </Card>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}