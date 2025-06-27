import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import AnimatedBackground from '@/components/AnimatedBackground';

interface User {
    id: number;
    name: string;
    email: string;
    memberSince: string;
    membershipType: string;
    profileImage?: string;
}

interface Workout {
    id: number;
    title: string;
    description: string;
    image: string;
    duration: string;
    difficulty: string;
    type: string;
    equipment: string[];
    targetMuscles: string[];
    calories: number;
}

interface WorkoutsIndexProps {
    auth: {
        user: User;
    };
    workouts: Workout[];
}

export default function WorkoutsIndex({ auth, workouts }: WorkoutsIndexProps) {
    const user = auth.user;

    const workoutCategories = [
        { name: 'Strength', color: 'bg-gradient-to-r from-red-700 to-red-800', count: 12 },
        { name: 'Cardio', color: 'bg-gradient-to-r from-blue-700 to-blue-800', count: 8 },
        { name: 'HIIT', color: 'bg-gradient-to-r from-orange-700 to-orange-800', count: 6 },
        { name: 'Yoga', color: 'bg-gradient-to-r from-green-700 to-green-800', count: 10 },
        { name: 'Pilates', color: 'bg-gradient-to-r from-purple-700 to-purple-800', count: 5 },
        { name: 'Flexibility', color: 'bg-gradient-to-r from-teal-700 to-teal-800', count: 4 },
    ];

    const featuredWorkouts = workouts?.slice(0, 6) || [
        {
            id: 1,
            title: 'Full Body Strength Training',
            description: 'Build muscle and increase strength with this comprehensive workout',
            image: '/Images/workout1.jpg',
            duration: '45 min',
            difficulty: 'Intermediate',
            type: 'Strength',
            equipment: ['Dumbbells', 'Barbell', 'Bench'],
            targetMuscles: ['Chest', 'Back', 'Legs', 'Arms'],
            calories: 350
        },
        {
            id: 2,
            title: 'High-Intensity Cardio Blast',
            description: 'Burn calories and improve cardiovascular health',
            image: '/Images/workout2.jpg',
            duration: '30 min',
            difficulty: 'Advanced',
            type: 'HIIT',
            equipment: ['None'],
            targetMuscles: ['Full Body'],
            calories: 400
        },
        {
            id: 3,
            title: 'Morning Yoga Flow',
            description: 'Start your day with gentle stretches and mindfulness',
            image: '/Images/workout3.jpg',
            duration: '20 min',
            difficulty: 'Beginner',
            type: 'Yoga',
            equipment: ['Yoga Mat'],
            targetMuscles: ['Core', 'Flexibility'],
            calories: 120
        },
        {
            id: 4,
            title: 'Core Power Pilates',
            description: 'Strengthen your core and improve posture',
            image: '/Images/workout4.jpg',
            duration: '35 min',
            difficulty: 'Intermediate',
            type: 'Pilates',
            equipment: ['Mat', 'Resistance Band'],
            targetMuscles: ['Core', 'Glutes'],
            calories: 200
        },
        {
            id: 5,
            title: 'Upper Body Pump',
            description: 'Focus on building strong arms, chest, and back',
            image: '/Images/workout5.jpg',
            duration: '40 min',
            difficulty: 'Intermediate',
            type: 'Strength',
            equipment: ['Dumbbells', 'Pull-up Bar'],
            targetMuscles: ['Chest', 'Back', 'Arms', 'Shoulders'],
            calories: 300
        },
        {
            id: 6,
            title: 'Flexibility & Mobility',
            description: 'Improve range of motion and prevent injury',
            image: '/Images/workout6.jpg',
            duration: '25 min',
            difficulty: 'Beginner',
            type: 'Flexibility',
            equipment: ['Yoga Mat', 'Foam Roller'],
            targetMuscles: ['Full Body'],
            calories: 100
        }
    ];

    return (
        <AppLayout auth={auth}>
            <Head title="Workouts - UltraFlex Members">
                <meta name="description" content="Browse and access exclusive workout routines designed for UltraFlex members." />
            </Head>

            <div className="min-h-screen relative">
                <AnimatedBackground 
                    variant="gradient" 
                    intensity="medium"
                    className="z-0"
                />
                
                <div className="relative z-10">
                    {/* Header */}
                    <section className="bg-gradient-to-r from-red-900/80 to-red-700/80 py-16 backdrop-blur-sm relative overflow-hidden">
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
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-red-700/20 backdrop-blur-sm flex items-center justify-center border border-red-700/30">
                                        <span className="text-white text-xl font-bold">W</span>
                                    </div>
                                    <div className="text-white">
                                        <h1 className="text-4xl font-bold mb-2">Member Workouts</h1>
                                        <p className="text-xl text-gray-200">
                                            Exclusive fitness routines for {user.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Link href="/members">
                                        <Button variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                Back to Hub
                                            </span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Workout Categories */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-white mb-8">Workout Categories</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {workoutCategories.map((category, index) => (
                                    <Card key={index} className="hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                        <CardContent className="p-6 text-center">
                                            <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition-all duration-300`}>
                                                <span className="text-white text-xl font-bold">
                                                    {category.name.charAt(0)}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">
                                                {category.name}
                                            </h3>
                                            <p className="text-gray-300 text-sm mb-4">
                                                {category.count} workouts available
                                            </p>
                                            <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group">
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                    Browse {category.name}
                                                </span>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Featured Workouts */}
                    <section className="py-16 bg-black/20 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-white mb-8">Featured Workouts</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {featuredWorkouts.map((workout) => (
                                    <Card key={workout.id} className="overflow-hidden hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                        <div className="h-48 bg-gray-800 relative overflow-hidden">
                                            <img 
                                                src={workout.image} 
                                                alt={workout.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            
                                            {/* Duration badge */}
                                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
                                                <span className="text-white text-sm font-medium">{workout.duration}</span>
                                            </div>

                                            {/* Difficulty badge */}
                                            <div className="absolute top-3 left-3">
                                                <span className={`px-3 py-1 rounded-full text-xs backdrop-blur-sm border ${
                                                    workout.difficulty === 'Beginner' ? 'bg-green-700/20 text-green-400 border-green-700/30' :
                                                    workout.difficulty === 'Intermediate' ? 'bg-yellow-700/20 text-yellow-400 border-yellow-700/30' :
                                                    'bg-red-700/20 text-red-700 border-red-700/30'
                                                }`}>
                                                    {workout.difficulty}
                                                </span>
                                            </div>

                                            {/* Start overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <Button className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-red-700/20 backdrop-blur-sm">
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        Start Workout
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>
                                        <CardContent className="p-6 bg-black/20 backdrop-blur-sm">
                                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">
                                                {workout.title}
                                            </h3>
                                            <p className="text-gray-300 text-sm mb-4">
                                                {workout.description}
                                            </p>
                                            
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between text-sm text-gray-300">
                                                    <span>Type: <span className="text-white">{workout.type}</span></span>
                                                    <span>Calories: <span className="text-red-400">{workout.calories}</span></span>
                                                </div>
                                                
                                                <div className="text-sm text-gray-300">
                                                    <span>Equipment: </span>
                                                    <span className="text-white">{workout.equipment.join(', ')}</span>
                                                </div>
                                                
                                                <div className="text-sm text-gray-300">
                                                    <span>Target: </span>
                                                    <span className="text-white">{workout.targetMuscles.join(', ')}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-4 pt-4 border-t border-white/10">
                                                <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group">
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        View Details
                                                    </span>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Quick Stats */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-white text-center mb-12">Your Workout Stats</h2>
                            <div className="grid md:grid-cols-4 gap-6">
                                <Card className="p-6 text-center bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group">
                                    <div className="w-16 h-16 bg-red-700/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-red-700/30 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-red-700 text-xl font-bold">T</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-1">45</h3>
                                    <p className="text-gray-300 text-sm">Total Workouts</p>
                                </Card>

                                <Card className="p-6 text-center bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group">
                                    <div className="w-16 h-16 bg-green-700/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-green-700/30 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-green-400 text-xl font-bold">W</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-1">3</h3>
                                    <p className="text-gray-300 text-sm">This Week</p>
                                </Card>

                                <Card className="p-6 text-center bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group">
                                    <div className="w-16 h-16 bg-purple-700/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-700/30 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-purple-400 text-xl font-bold">H</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-1">24</h3>
                                    <p className="text-gray-300 text-sm">Hours Trained</p>
                                </Card>

                                <Card className="p-6 text-center bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group">
                                    <div className="w-16 h-16 bg-yellow-700/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-700/30 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-yellow-400 text-xl font-bold">C</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-1">8,250</h3>
                                    <p className="text-gray-300 text-sm">Calories Burned</p>
                                </Card>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
