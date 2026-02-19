import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { User as SharedUser } from '@/types';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useState } from 'react';

// Use shared User type
type User = SharedUser;

interface Workout {
    id: number;
    title: string;
    description: string;
    image: string;
    difficulty: string;
    type: string;
    equipment: string[];
    targetMuscles: string[];
    videoLinks?: string[];
}

interface WorkoutsIndexProps {
    auth: {
        user: User;
    };
    workouts: Workout[];
}

export default function WorkoutsIndex({ auth, workouts }: WorkoutsIndexProps) {
    const user = auth.user;
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const workoutCategories = [
    { name: 'Core', color: 'bg-white/10', count: 1 },
    { name: 'Strength', color: 'bg-white/10', count: 5 },
    { name: 'Competition', color: 'bg-white/10', count: 1 },
    ];

    const allWorkouts = workouts || [
        {
            id: 1,
            title: 'ABS WORKOUT',
            description: 'Sculpt and strengthen your core with targeted abdominal exercises',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop&crop=center',
            difficulty: 'Intermediate',
            type: 'Core',
            equipment: ['Mat', 'Medicine Ball', 'Ab Wheel'],
            targetMuscles: ['Abs', 'Core', 'Obliques'],
            videoLinks: ['https://youtu.be/p35TqPT2x_g', 'https://youtu.be/9YYaAzaSbHE']
        },
        {
            id: 2,
            title: 'ARMS WORKOUT',
            description: 'Build powerful biceps, triceps, and forearms',
            image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=400&fit=crop&crop=center',
            difficulty: 'Intermediate',
            type: 'Strength',
            equipment: ['Dumbbells', 'Barbell', 'Cable Machine'],
            targetMuscles: ['Biceps', 'Triceps', 'Forearms'],
            videoLinks: [
                'https://youtu.be/A88KMLpQ6nk',
                'https://youtu.be/6tqw20euw2M',
                'https://youtu.be/GKPaqjkYaIY',
                'https://youtu.be/ZcBqA0p6IIM',
                'https://youtu.be/2qhE7JnnwnM',
                'https://youtu.be/CZGMv87OZ0g',
                'https://youtu.be/kjpzFfZSmiU',
                'https://youtu.be/dmLttCxXnBE',
                'https://youtu.be/lCRnAtHAvWs',
                'https://youtu.be/BlAXY9rk4r8'
            ]
        },
        {
            id: 3,
            title: 'BACK WORKOUT',
            description: 'Develop a strong and wide back with compound movements',
            image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&h=400&fit=crop&crop=center',
            difficulty: 'Advanced',
            type: 'Strength',
            equipment: ['Pull-up Bar', 'Barbell', 'Cable Machine', 'Dumbbells'],
            targetMuscles: ['Lats', 'Rhomboids', 'Traps', 'Lower Back'],
            videoLinks: [
                'https://youtu.be/7f615JNrqdQ',
                'https://youtu.be/EiHpTYvSgRw',
                'https://youtu.be/iFKQCUjhc_8',
                'https://youtu.be/5On4JVxgmAI',
                'https://youtu.be/uW4tO3GyIFk',
                'https://youtu.be/2RjQC2cByww',
                'https://youtu.be/cjc_W_PlzU0',
                'https://youtu.be/qlIvuqHi1Ic',
                'https://youtu.be/C21SlvzrxHo',
                'https://youtu.be/bWbbSyIUDvA',
                'https://youtu.be/zHNGzq1ZxDo',
                'https://youtu.be/qT-BjESsQ50',
                'https://youtu.be/8bDVCtVXDGM',
                'https://youtu.be/Ar74l1V-dcs',
                'https://youtu.be/kAUH6rLNWhQ'
            ]
        },
        {
            id: 4,
            title: 'CHEST WORKOUT',
            description: 'Build a powerful chest with pressing movements and isolation exercises',
            image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=400&fit=crop&crop=center',
            difficulty: 'Intermediate',
            type: 'Strength',
            equipment: ['Barbell', 'Dumbbells', 'Bench', 'Cable Machine'],
            targetMuscles: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
            videoLinks: [
                'https://youtu.be/4Wi8vIApknY',
                'https://youtu.be/9pMQCZBRRs4',
                'https://youtu.be/HUDuxMVW6C8',
                'https://youtu.be/03fb6Bdi804',
                'https://youtu.be/PjlXtxRXJHU',
                'https://youtu.be/lLWnQ837un8',
                'https://youtu.be/ZJAvTv7L7hc',
                'https://youtu.be/Q92P2kjQJhw',
                'https://youtu.be/BxMycL6PEWg'
            ]
        },
        {
            id: 5,
            title: 'LEGS WORKOUT',
            description: 'Power up your lower body with squats, deadlifts, and leg isolation',
            image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=500&h=400&fit=crop&crop=center',
            difficulty: 'Advanced',
            type: 'Strength',
            equipment: ['Barbell', 'Dumbbells', 'Leg Press', 'Squat Rack'],
            targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves'],
            videoLinks: [
                'https://youtu.be/yhXvDOJRcX4',
                'https://youtu.be/Icb_fq2yXZk',
                'https://youtu.be/RR9TNQcqexY',
                'https://youtu.be/_5B2AwA8vKE',
                'https://youtu.be/OWL84VQJnPo',
                'https://youtu.be/maq6g5DWbng',
                'https://youtu.be/lujGa5WwtB8',
                'https://youtu.be/8Jvz7Ih9s3s',
                'https://youtu.be/6uHRFgQHwDs',
                'https://youtu.be/QbvAh_aRWGA',
                'https://youtu.be/WMEAfmhEoKg',
                'https://youtu.be/rr8_suFwxxI',
                'https://youtu.be/56lhH2oK2p0',
                'https://youtu.be/TbEQh_gfhQw',
                'https://youtu.be/03ZkHCXovYc',
                'https://youtu.be/X5rf6cDQluw',
                'https://youtu.be/1nh7ymbABXY',
                'https://youtu.be/ihi01nuMVM0',
                'https://youtu.be/opsibwL7_6k',
                'https://youtu.be/McSfNQY5IyY',
                'https://youtu.be/-3SGJWh9a8g',
                'https://youtu.be/FLYwAQhHdVc',
                'https://youtu.be/tZqhAn-APZE',
                'https://youtu.be/I7BAJRA3c1g',
                'https://youtu.be/31zcjMBA3hk',
                'https://youtu.be/eWtS2IZE6DA'
            ]
        },
        {
            id: 6,
            title: 'SHOULDER WORKOUT',
            description: 'Build impressive deltoids with pressing and lateral movements',
            image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&h=400&fit=crop&crop=center',
            difficulty: 'Intermediate',
            type: 'Strength',
            equipment: ['Dumbbells', 'Barbell', 'Cable Machine'],
            targetMuscles: ['Deltoids', 'Rotator Cuff', 'Traps'],
            videoLinks: [
                'https://youtu.be/8KMIcOKmFD0',
                'https://youtu.be/JITeLkRsOh4',
                'https://youtu.be/m5yWt8A4GQM',
                'https://youtu.be/5rv2OnMsd1I',
                'https://youtu.be/i6RC9ifs4D4'
            ]
        },
        {
            id: 7,
            title: 'CONTEST PREP',
            description: 'Elite competition preparation program for serious athletes looking to compete at the highest level',
            image: '/Images/workout/Contest-Prep-768x432.webp',
            difficulty: 'Expert',
            type: 'Competition',
            equipment: ['Full Gym Access', 'All Equipment'],
            targetMuscles: ['Full Body', 'Competition Focus']
        }
    ];

    // Filter workouts based on selected category
    const filteredWorkouts = selectedCategory 
        ? allWorkouts.filter(workout => workout.type === selectedCategory)
        : allWorkouts;

    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategory(selectedCategory === categoryName ? null : categoryName);
    };

    const handleShowAll = () => {
        setSelectedCategory(null);
    };

    return (
        <AppLayout auth={auth}>
            <Head title="Workouts - ULTRAFLEX Members">
                <meta name="description" content="Browse and access exclusive workout routines designed for ULTRAFLEX members." />
            </Head>

            <div className="min-h-screen relative">
                <AnimatedBackground 
                    variant="gradient" 
                    intensity="medium"
                    className="z-0"
                />
                
                <div className="relative z-10">
                    {/* Header */}
                    <section className="relative py-16 overflow-hidden">
                        {/* Background Image */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')"
                            }}
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-white/5 to-black/80" />
                        
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
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
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
                                    <Card key={index} className={`hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-black/40 backdrop-blur-md border hover:border-white/20 group ${
                                        selectedCategory === category.name 
                                            ? 'border-white/30 ring-2 ring-white/10' 
                                            : 'border-white/10'
                                    }`}>
                                        <CardContent className="p-6 text-center">
                                            <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition-all duration-300 border border-white/20`}>
                                                <span className="text-white text-xl font-bold">
                                                    {category.name.charAt(0)}
                                                </span>
                                            </div>
                                            <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                                                selectedCategory === category.name ? 'text-white' : 'text-white'
                                            }`}>
                                                {category.name}
                                            </h3>
                                            <p className="text-gray-300 text-sm mb-4">
                                                {category.count} workouts available
                                            </p>
                                            <Button 
                                                className={`w-full transition-all duration-300 group bg-white/10 hover:bg-white/20`}
                                                onClick={() => handleCategoryClick(category.name)}
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                    {selectedCategory === category.name ? `Showing ${category.name}` : `Browse ${category.name}`}
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
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-bold text-white">
                                    {selectedCategory ? `${selectedCategory} Workouts` : 'All Workouts'}
                                </h2>
                                {selectedCategory && (
                                    <Button 
                                        onClick={handleShowAll}
                                        variant="outline" 
                                        className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white"
                                    >
                                        Show All Workouts
                                    </Button>
                                )}
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredWorkouts.map((workout: Workout) => (
                                    <Card key={workout.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/20 group">
                                        <div className="h-48 bg-gray-800 relative overflow-hidden">
                                            <img 
                                                src={workout.image} 
                                                alt={workout.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            
                                            {/* Difficulty badge */}
                                            <div className="absolute top-3 left-3">
                                                <span className={`px-3 py-1 rounded-full text-xs backdrop-blur-sm border bg-white/10 text-white border-white/20`}>
                                                    {workout.difficulty}
                                                </span>
                                            </div>

                                            {/* View overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <Link href={`/members/workouts/${workout.id}`}>
                                                    <Button 
                                                        className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/20 backdrop-blur-sm"
                                                    >
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                            View Workout
                                                        </span>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                        <CardContent className="p-6 bg-black/20 backdrop-blur-sm">
                                            <h3 className="text-xl font-semibold text-white mb-2 transition-colors duration-300">
                                                {workout.title}
                                            </h3>
                                            <p className="text-gray-300 text-sm mb-4">
                                                {workout.description}
                                            </p>
                                            
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between text-sm text-gray-300">
                                                    <span>Type: <span className="text-white">{workout.type}</span></span>
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
                                                <Link href={`/members/workouts/${workout.id}`}>
                                                    <Button 
                                                        className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group"
                                                    >
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                            View Details
                                                        </span>
                                                    </Button>
                                                </Link>
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
