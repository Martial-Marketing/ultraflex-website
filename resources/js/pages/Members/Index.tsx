import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
    Dumbbell, 
    Apple, 
    Calendar, 
    Target, 
    TrendingUp, 
    Clock,
    Users,
    Award,
    BookOpen,
    Play,
    ChevronRight
} from 'lucide-react';

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
            icon: Dumbbell,
            href: '/members/workouts',
            color: 'bg-blue-600 hover:bg-blue-700',
        },
        {
            title: 'Nutrition Plans',
            description: 'Healthy recipes and meal plans',
            icon: Apple,
            href: '/members/nutrition',
            color: 'bg-green-600 hover:bg-green-700',
        },
        {
            title: 'Book PT Session',
            description: 'Schedule with a personal trainer',
            icon: Users,
            href: '/trainers',
            color: 'bg-purple-600 hover:bg-purple-700',
        },
        {
            title: 'Virtual Tours',
            description: 'Explore our gym facilities',
            icon: Play,
            href: '/tours',
            color: 'bg-orange-600 hover:bg-orange-700',
        },
    ];

    const statsCards = [
        {
            title: 'Total Workouts',
            value: workoutStats.totalWorkouts,
            subtitle: 'All time',
            icon: Dumbbell,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        {
            title: 'This Week',
            value: workoutStats.thisWeek,
            subtitle: 'Workouts completed',
            icon: Calendar,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        {
            title: 'Total Hours',
            value: workoutStats.totalHours,
            subtitle: 'Time spent training',
            icon: Clock,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
        },
        {
            title: 'Favorite Type',
            value: workoutStats.favoriteWorkout,
            subtitle: 'Most completed',
            icon: Target,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
            isString: true,
        },
    ];

    return (
        <>
            <Head title="Members Hub - UltraFlex">
                <meta name="description" content="Welcome to your UltraFlex Members Hub. Access workouts, nutrition plans, and track your fitness journey." />
            </Head>

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
                    <div className="container mx-auto px-6">
                        <div className="flex items-center space-x-6">
                            <div className="w-20 h-20 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
                                {user.profileImage ? (
                                    <img 
                                        src={user.profileImage} 
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Users className="h-10 w-10 text-white" />
                                )}
                            </div>
                            <div className="text-white">
                                <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
                                <p className="text-xl text-blue-100">
                                    {user.membershipType} Member since {user.memberSince}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Actions */}
                <section className="py-8 -mt-8 relative z-10">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {quickActions.map((action, index) => {
                                const IconComponent = action.icon;
                                return (
                                    <Link key={index} href={action.href}>
                                        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                                            <CardContent className="p-6 text-center">
                                                <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                                    <IconComponent className="h-6 w-6 text-white" />
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                                                <p className="text-gray-600 text-sm">{action.description}</p>
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
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Progress</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {statsCards.map((stat, index) => {
                                const IconComponent = stat.icon;
                                return (
                                    <Card key={index}>
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                                                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                                                </div>
                                                <TrendingUp className="h-4 w-4 text-green-500" />
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-gray-900 mb-1">
                                                    {stat.isString ? stat.value : `${stat.value}`}
                                                </div>
                                                <div className="text-sm text-gray-600">{stat.subtitle}</div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Recent Activity */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="grid lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                                <div className="space-y-4">
                                    {recentActivity.map((activity) => (
                                        <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                activity.type === 'workout' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                                            }`}>
                                                {activity.type === 'workout' ? (
                                                    <Dumbbell className="h-5 w-5" />
                                                ) : (
                                                    <Apple className="h-5 w-5" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900">{activity.title}</h3>
                                                <div className="flex items-center space-x-2 text-sm text-gray-500">
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
                                    <Button variant="outline" className="w-full">
                                        View All Activity
                                        <ChevronRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>

                            <div className="lg:col-span-2">
                                {/* Featured Workouts */}
                                <div className="mb-12">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold text-gray-900">Featured Workouts</h2>
                                        <Link href="/members/workouts">
                                            <Button variant="outline">
                                                View All
                                                <ChevronRight className="h-4 w-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {featuredContent.workouts.map((workout) => (
                                            <Card key={workout.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                                <div className="h-40 bg-gray-200 relative overflow-hidden">
                                                    <img 
                                                        src={workout.image} 
                                                        alt={workout.title}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                    />
                                                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                                                        <span className="text-white text-xs font-medium">{workout.duration}</span>
                                                    </div>
                                                </div>
                                                <CardContent className="p-4">
                                                    <h3 className="font-semibold text-gray-900 mb-2">{workout.title}</h3>
                                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                                        <span className="flex items-center">
                                                            <Target className="h-4 w-4 mr-1" />
                                                            {workout.type}
                                                        </span>
                                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                                            workout.difficulty === 'Beginner' ? 'bg-green-100 text-green-600' :
                                                            workout.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-600' :
                                                            'bg-red-100 text-red-600'
                                                        }`}>
                                                            {workout.difficulty}
                                                        </span>
                                                    </div>
                                                    <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                                                        Start Workout
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>

                                {/* Featured Nutrition */}
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold text-gray-900">Featured Nutrition</h2>
                                        <Link href="/members/nutrition">
                                            <Button variant="outline">
                                                View All
                                                <ChevronRight className="h-4 w-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {featuredContent.nutrition.map((recipe) => (
                                            <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                                <div className="h-40 bg-gray-200 relative overflow-hidden">
                                                    <img 
                                                        src={recipe.image} 
                                                        alt={recipe.title}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                    />
                                                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                                                        <span className="text-white text-xs font-medium">{recipe.prepTime}</span>
                                                    </div>
                                                </div>
                                                <CardContent className="p-4">
                                                    <h3 className="font-semibold text-gray-900 mb-2">{recipe.title}</h3>
                                                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                                                        <span className="flex items-center">
                                                            <Apple className="h-4 w-4 mr-1" />
                                                            {recipe.calories} cal
                                                        </span>
                                                        <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                                                            {recipe.goal}
                                                        </span>
                                                    </div>
                                                    <Button variant="outline" className="w-full">
                                                        View Recipe
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
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Your Fitness Journey</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <Card className="p-6 text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Target className="h-8 w-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Set Goals</h3>
                                <p className="text-gray-600 mb-4">
                                    Define your fitness objectives and track your progress
                                </p>
                                <Button variant="outline">Set New Goal</Button>
                            </Card>

                            <Card className="p-6 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="h-8 w-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Progress</h3>
                                <p className="text-gray-600 mb-4">
                                    Monitor your workouts, nutrition, and achievements
                                </p>
                                <Button variant="outline">View Progress</Button>
                            </Card>

                            <Card className="p-6 text-center">
                                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Award className="h-8 w-8 text-yellow-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Earn Rewards</h3>
                                <p className="text-gray-600 mb-4">
                                    Achieve milestones and unlock exclusive benefits
                                </p>
                                <Button variant="outline">View Rewards</Button>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Help & Support */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Need Help?</h2>
                            <p className="text-xl text-gray-600 mb-8">
                                Our team is here to support you on your fitness journey
                            </p>
                            <div className="grid md:grid-cols-3 gap-6">
                                <Link href="/trainers">
                                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                        <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Training</h3>
                                        <p className="text-gray-600 text-sm">Get one-on-one guidance from our expert trainers</p>
                                    </Card>
                                </Link>

                                <Link href="/contact">
                                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                        <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Support Center</h3>
                                        <p className="text-gray-600 text-sm">Find answers to common questions and get help</p>
                                    </Card>
                                </Link>

                                <Link href="/locations">
                                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                        <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit a Location</h3>
                                        <p className="text-gray-600 text-sm">Talk to our staff at any UltraFlex location</p>
                                    </Card>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}