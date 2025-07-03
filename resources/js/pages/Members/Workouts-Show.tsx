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
    difficulty: string;
    type: string;
    equipment: string[];
    targetMuscles: string[];
    videoLinks?: string[];
    detailedDescription?: string;
    faq?: Array<{
        question: string;
        answer: string;
    }>;
}

interface WorkoutsShowProps {
    auth: {
        user: User;
    };
    workout: Workout;
}

export default function WorkoutsShow({ auth, workout }: WorkoutsShowProps) {
    const user = auth.user;

    // Function to extract YouTube video ID from URL
    const getYouTubeVideoId = (url: string) => {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&\n?#]+)/);
        return match ? match[1] : null;
    };

    // Function to get YouTube embed URL
    const getYouTubeEmbedUrl = (url: string) => {
        const videoId = getYouTubeVideoId(url);
        return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1` : null;
    };

    return (
        <AppLayout auth={auth}>
            <Head title={`${workout.title} - UltraFlex Members`}>
                <meta name="description" content={`${workout.description} - Exclusive workout routine for UltraFlex members.`} />
            </Head>

            <div className="min-h-screen relative">
                <AnimatedBackground 
                    variant="gradient" 
                    intensity="medium"
                    className="z-0"
                />
                
                <div className="relative z-10">
                    {/* Hero Section */}
                    <section className="relative h-96 overflow-hidden">
                        <img 
                            src={workout.image} 
                            alt={workout.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        
                        {/* Navigation */}
                        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                            <Link href="/members/workouts">
                                <Button variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                        ← Back to Workouts
                                    </span>
                                </Button>
                            </Link>
                            <Link href="/members">
                                <Button variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                        Members Hub
                                    </span>
                                </Button>
                            </Link>
                        </div>

                        {/* Workout Title */}
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-end justify-between">
                                <div>
                                    <h1 className="text-5xl font-bold text-white mb-4">{workout.title}</h1>
                                    <div className="flex items-center gap-4">
                                        <span className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border ${
                                            workout.difficulty === 'Beginner' ? 'bg-green-700/20 text-green-400 border-green-700/30' :
                                            workout.difficulty === 'Intermediate' ? 'bg-yellow-700/20 text-yellow-400 border-yellow-700/30' :
                                            workout.difficulty === 'Expert' ? 'bg-purple-700/20 text-purple-400 border-purple-700/30' :
                                            'bg-red-700/20 text-red-400 border-red-700/30'
                                        }`}>
                                            {workout.difficulty}
                                        </span>
                                        <span className="px-4 py-2 rounded-full text-sm font-medium bg-red-700/20 text-red-400 border border-red-700/30 backdrop-blur-sm">
                                            {workout.type}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Content Section */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <div className="grid lg:grid-cols-3 gap-12">
                                {/* Main Content */}
                                <div className="lg:col-span-2">
                                    {/* Description */}
                                    <Card className="mb-8 bg-black/40 backdrop-blur-md border border-white/10">
                                        <CardContent className="p-8">
                                            <h2 className="text-3xl font-bold text-white mb-6">About This Workout</h2>
                                            
                                            {/* Workout Image */}
                                            <div className="mb-8">
                                                <img 
                                                    src={workout.image} 
                                                    alt={workout.title}
                                                    className="w-full object-contain rounded-lg border border-white/10"
                                                />
                                            </div>
                                            
                                            <p className="text-gray-300 text-lg leading-relaxed mb-6">{workout.description}</p>
                                            
                                            {/* Detailed Description for Contest Prep */}
                                            {workout.detailedDescription && (
                                                <div className="mt-8 pt-8 border-t border-white/10">
                                                    <div className="prose prose-invert max-w-none">
                                                        {workout.detailedDescription.split('\n\n').map((paragraph, index) => (
                                                            <p key={index} className="text-gray-300 text-lg leading-relaxed mb-6">
                                                                {paragraph}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>

                                    {/* FAQ Section for Contest Prep */}
                                    {workout.faq && workout.faq.length > 0 && (
                                        <Card className="mb-8 bg-black/40 backdrop-blur-md border border-white/10">
                                            <CardContent className="p-8">
                                                <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                                                <div className="space-y-6">
                                                    {workout.faq.map((item, index) => (
                                                        <div key={index} className="bg-black/20 rounded-lg p-6 border border-white/10">
                                                            <h3 className="text-white font-semibold text-lg mb-3">
                                                                {item.question}
                                                            </h3>
                                                            <p className="text-gray-300 leading-relaxed">
                                                                {item.answer}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {/* Video Links Section */}
                                    {workout.videoLinks && workout.videoLinks.length > 0 && (
                                        <Card className="mb-8 bg-black/40 backdrop-blur-md border border-white/10">
                                            <CardContent className="p-8">
                                                <h2 className="text-3xl font-bold text-white mb-6">Training Videos</h2>
                                                <div className="grid gap-8">
                                                    {workout.videoLinks.map((link, index) => {
                                                        const embedUrl = getYouTubeEmbedUrl(link);
                                                        return (
                                                            <div key={index} className="bg-black/20 rounded-lg border border-white/10 overflow-hidden hover:border-red-700/30 transition-colors">
                                                                <div className="p-4">
                                                                    <h3 className="text-white font-semibold text-lg mb-4">
                                                                        Training Video {index + 1}
                                                                    </h3>
                                                                    {embedUrl ? (
                                                                        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                                                                            <iframe
                                                                                src={embedUrl}
                                                                                title={`Training Video ${index + 1}`}
                                                                                className="w-full h-full"
                                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                                allowFullScreen
                                                                            />
                                                                        </div>
                                                                    ) : (
                                                                        <div className="w-full aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                                                                            <div className="text-center">
                                                                                <span className="text-gray-400 text-lg mb-2 block">Unable to load video</span>
                                                                                <Button
                                                                                    className="bg-red-600 hover:bg-red-700 text-white"
                                                                                    onClick={() => window.open(link, '_blank')}
                                                                                >
                                                                                    Watch on YouTube
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    <p className="text-gray-400 mt-3 text-sm">
                                                                        Professional workout demonstration and technique guidance
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {/* Workout Tips */}
                                    <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                                        <CardContent className="p-8">
                                            <h2 className="text-3xl font-bold text-white mb-6">Workout Tips</h2>
                                            <div className="space-y-4">
                                                <div className="flex items-start space-x-3">
                                                    <div className="w-2 h-2 bg-red-700 rounded-full mt-2"></div>
                                                    <p className="text-gray-300">Always warm up for 5-10 minutes before starting your workout</p>
                                                </div>
                                                <div className="flex items-start space-x-3">
                                                    <div className="w-2 h-2 bg-red-700 rounded-full mt-2"></div>
                                                    <p className="text-gray-300">Focus on proper form rather than heavy weights</p>
                                                </div>
                                                <div className="flex items-start space-x-3">
                                                    <div className="w-2 h-2 bg-red-700 rounded-full mt-2"></div>
                                                    <p className="text-gray-300">Stay hydrated throughout your workout session</p>
                                                </div>
                                                <div className="flex items-start space-x-3">
                                                    <div className="w-2 h-2 bg-red-700 rounded-full mt-2"></div>
                                                    <p className="text-gray-300">Cool down and stretch after completing the workout</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Sidebar */}
                                <div className="lg:col-span-1">
                                    {/* Equipment Needed */}
                                    <Card className="mb-8 bg-black/40 backdrop-blur-md border border-white/10">
                                        <CardContent className="p-6">
                                            <h3 className="text-xl font-semibold text-white mb-4">Equipment Needed</h3>
                                            <ul className="space-y-3">
                                                {workout.equipment.map((item, index) => (
                                                    <li key={index} className="text-gray-300 flex items-center">
                                                        <span className="w-2 h-2 bg-red-700 rounded-full mr-3"></span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    {/* Target Muscles */}
                                    <Card className="mb-8 bg-black/40 backdrop-blur-md border border-white/10">
                                        <CardContent className="p-6">
                                            <h3 className="text-xl font-semibold text-white mb-4">Target Muscles</h3>
                                            <ul className="space-y-3">
                                                {workout.targetMuscles.map((muscle, index) => (
                                                    <li key={index} className="text-gray-300 flex items-center">
                                                        <span className="w-2 h-2 bg-red-700 rounded-full mr-3"></span>
                                                        {muscle}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    {/* Workout Stats */}
                                    <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                                        <CardContent className="p-6">
                                            <h3 className="text-xl font-semibold text-white mb-4">Workout Details</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <span className="text-gray-400 text-sm">Difficulty Level</span>
                                                    <p className="text-white font-medium">{workout.difficulty}</p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-400 text-sm">Workout Type</span>
                                                    <p className="text-white font-medium">{workout.type}</p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-400 text-sm">Equipment Required</span>
                                                    <p className="text-white font-medium">{workout.equipment.length} items</p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-400 text-sm">Primary Focus</span>
                                                    <p className="text-white font-medium">{workout.targetMuscles.join(', ')}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Action Section */}
                    <section className="py-16 bg-black/20 backdrop-blur-md">
                        <div className="container mx-auto px-6 text-center">
                            <h2 className="text-3xl font-bold text-white mb-8">Ready to Get Started?</h2>
                            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                                Head to the gym with confidence knowing exactly what equipment you need and which muscles you'll be targeting.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/members/workouts">
                                    <Button className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 text-lg">
                                        Browse More Workouts
                                    </Button>
                                </Link>
                                <Link href="/members">
                                    <Button variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white px-8 py-3 text-lg">
                                        Back to Members Hub
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
