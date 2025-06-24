import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
    Star, 
    MapPin, 
    Award, 
    Calendar, 
    Clock, 
    Users, 
    Dumbbell,
    Heart,
    Target,
    Phone,
    Mail,
    MessageSquare
} from 'lucide-react';

interface Trainer {
    id: number;
    name: string;
    image: string;
    bio: string;
    detailedBio: string;
    specialties: string[];
    gender: 'Male' | 'Female' | 'Non-Binary';
    location: string;
    locationSlug: string;
    rating: number;
    reviewCount: number;
    experience: string;
    certifications: string[];
    qualifications: string[];
    philosophy: string;
    achievements: string[];
    socialMedia: {
        instagram?: string;
        facebook?: string;
        youtube?: string;
    };
    sessionTypes: {
        type: string;
        duration: string;
        price: number;
    }[];
    availability: {
        day: string;
        times: string[];
    }[];
    testimonials: {
        id: number;
        name: string;
        rating: number;
        comment: string;
        date: string;
        beforeAfter?: {
            before: string;
            after: string;
        };
    }[];
}

interface TrainerShowProps {
    trainer: Trainer;
    auth: {
        user: any;
    };
}

export default function TrainerShow({ trainer }: TrainerShowProps) {
    const [activeTab, setActiveTab] = useState('about');
    
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferred_session: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/trainers/${trainer.id}/contact`);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star 
                key={i} 
                className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
            />
        ));
    };

    const getSpecialtyIcon = (specialty: string) => {
        const icons: { [key: string]: any } = {
            'strength': Dumbbell,
            'weight loss': Heart,
            'bodybuilding': Users,
            'nutrition': Target,
            'conditioning': Award,
        };
        
        const specialtyKey = specialty.toLowerCase();
        for (const [key, IconComponent] of Object.entries(icons)) {
            if (specialtyKey.includes(key)) {
                return <IconComponent className="h-5 w-5" />;
            }
        }
        return <Dumbbell className="h-5 w-5" />;
    };

    const tabs = [
        { id: 'about', label: 'About', icon: Users },
        { id: 'sessions', label: 'Sessions & Pricing', icon: Calendar },
        { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
        { id: 'contact', label: 'Contact', icon: Mail },
    ];

    return (
        <>
            <Head title={`${trainer.name} - Personal Trainer - UltraFlex`}>
                <meta name="description" content={`${trainer.name} is a certified personal trainer at UltraFlex specializing in ${trainer.specialties.join(', ')}. Book a session today!`} />
            </Head>

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-20">
                    <div className="container mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="text-white">
                                <h1 className="text-5xl font-bold mb-4">{trainer.name}</h1>
                                <p className="text-xl text-blue-100 mb-6">{trainer.experience}</p>
                                
                                <div className="flex items-center space-x-6 mb-6">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex">
                                            {renderStars(trainer.rating)}
                                        </div>
                                        <span className="text-lg font-semibold">
                                            {trainer.rating.toFixed(1)} ({trainer.reviewCount} reviews)
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center text-blue-100 mb-6">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    <span>Based at {trainer.location}</span>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {trainer.specialties.map((specialty, index) => (
                                        <span 
                                            key={index} 
                                            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full"
                                        >
                                            {getSpecialtyIcon(specialty)}
                                            <span>{specialty}</span>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <div className="relative">
                                    <img 
                                        src={trainer.image} 
                                        alt={trainer.name}
                                        className="w-80 h-80 rounded-2xl object-cover shadow-2xl"
                                    />
                                    <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600">{trainer.reviewCount}</div>
                                            <div className="text-sm text-gray-600">Happy Clients</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Navigation Tabs */}
                <section className="bg-white border-b sticky top-0 z-40">
                    <div className="container mx-auto px-6">
                        <nav className="flex space-x-8 overflow-x-auto">
                            {tabs.map((tab) => {
                                const IconComponent = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                                            activeTab === tab.id
                                                ? 'border-blue-600 text-blue-600'
                                                : 'border-transparent text-gray-600 hover:text-blue-600'
                                        }`}
                                    >
                                        <IconComponent className="h-4 w-4" />
                                        <span className="font-medium">{tab.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </section>

                {/* Tab Content */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        {/* About Tab */}
                        {activeTab === 'about' && (
                            <div className="grid lg:grid-cols-3 gap-12">
                                <div className="lg:col-span-2 space-y-8">
                                    {/* Bio */}
                                    <Card className="p-8">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">About {trainer.name}</h2>
                                        <p className="text-gray-600 leading-relaxed mb-6">{trainer.detailedBio}</p>
                                        
                                        {trainer.philosophy && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Training Philosophy</h3>
                                                <p className="text-gray-600 leading-relaxed italic">"{trainer.philosophy}"</p>
                                            </div>
                                        )}
                                    </Card>

                                    {/* Achievements */}
                                    {trainer.achievements.length > 0 && (
                                        <Card className="p-8">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
                                            <ul className="space-y-3">
                                                {trainer.achievements.map((achievement, index) => (
                                                    <li key={index} className="flex items-start space-x-3">
                                                        <Award className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                                        <span className="text-gray-600">{achievement}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Card>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    {/* Certifications */}
                                    <Card className="p-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Certifications</h3>
                                        <div className="space-y-3">
                                            {trainer.certifications.map((cert, index) => (
                                                <div key={index} className="flex items-center space-x-3">
                                                    <Award className="h-4 w-4 text-green-600" />
                                                    <span className="text-gray-600">{cert}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>

                                    {/* Qualifications */}
                                    <Card className="p-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Qualifications</h3>
                                        <div className="space-y-3">
                                            {trainer.qualifications.map((qual, index) => (
                                                <div key={index} className="flex items-center space-x-3">
                                                    <Target className="h-4 w-4 text-blue-600" />
                                                    <span className="text-gray-600">{qual}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>

                                    {/* Quick Contact */}
                                    <Card className="p-6 bg-blue-50">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Ready to Start?</h3>
                                        <p className="text-gray-600 mb-4">
                                            Book a consultation with {trainer.name} today!
                                        </p>
                                        <Button 
                                            className="w-full bg-blue-600 hover:bg-blue-700"
                                            onClick={() => setActiveTab('contact')}
                                        >
                                            Contact {trainer.name}
                                        </Button>
                                    </Card>
                                </div>
                            </div>
                        )}

                        {/* Sessions & Pricing Tab */}
                        {activeTab === 'sessions' && (
                            <div className="grid lg:grid-cols-2 gap-12">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Session Types & Pricing</h2>
                                    <div className="space-y-6">
                                        {trainer.sessionTypes.map((session, index) => (
                                            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-gray-900">{session.type}</h3>
                                                        <p className="text-gray-600 flex items-center mt-1">
                                                            <Clock className="h-4 w-4 mr-2" />
                                                            {session.duration}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold text-blue-600">£{session.price}</div>
                                                        <div className="text-sm text-gray-500">per session</div>
                                                    </div>
                                                </div>
                                                <Button variant="outline" className="w-full">
                                                    Book This Session
                                                </Button>
                                            </Card>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Availability</h2>
                                    <Card className="p-6">
                                        <div className="space-y-4">
                                            {trainer.availability.map((day, index) => (
                                                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                                                    <span className="font-medium text-gray-900">{day.day}</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {day.times.map((time, timeIndex) => (
                                                            <span 
                                                                key={timeIndex}
                                                                className="px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded"
                                                            >
                                                                {time}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                                            <p className="text-sm text-yellow-800">
                                                <strong>Note:</strong> Availability shown is general schedule. 
                                                Specific times may vary. Please contact for exact availability.
                                            </p>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        )}

                        {/* Testimonials Tab */}
                        {activeTab === 'testimonials' && (
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                                    What Clients Say About {trainer.name}
                                </h2>
                                
                                <div className="grid md:grid-cols-2 gap-8">
                                    {trainer.testimonials.map((testimonial) => (
                                        <Card key={testimonial.id} className="p-6">
                                            <div className="flex items-center space-x-4 mb-4">
                                                <div className="flex">
                                                    {renderStars(testimonial.rating)}
                                                </div>
                                                <span className="text-sm text-gray-500">{testimonial.date}</span>
                                            </div>
                                            
                                            <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                                            <p className="font-semibold text-gray-900">- {testimonial.name}</p>
                                            
                                            {testimonial.beforeAfter && (
                                                <div className="mt-6 grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900 mb-2">Before</p>
                                                        <img 
                                                            src={testimonial.beforeAfter.before} 
                                                            alt="Before transformation"
                                                            className="w-full h-32 object-cover rounded-lg"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900 mb-2">After</p>
                                                        <img 
                                                            src={testimonial.beforeAfter.after} 
                                                            alt="After transformation"
                                                            className="w-full h-32 object-cover rounded-lg"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Contact Tab */}
                        {activeTab === 'contact' && (
                            <div className="grid lg:grid-cols-2 gap-12">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
                                    
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name
                                            </label>
                                            <Input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                                className={errors.name ? 'border-red-500' : ''}
                                            />
                                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                            </label>
                                            <Input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                                className={errors.email ? 'border-red-500' : ''}
                                            />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <Input
                                                type="tel"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className={errors.phone ? 'border-red-500' : ''}
                                            />
                                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Preferred Session Type
                                            </label>
                                            <select
                                                value={data.preferred_session}
                                                onChange={(e) => setData('preferred_session', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Select a session type</option>
                                                {trainer.sessionTypes.map((session, index) => (
                                                    <option key={index} value={session.type}>
                                                        {session.type} - £{session.price}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Message
                                            </label>
                                            <Textarea
                                                value={data.message}
                                                onChange={(e) => setData('message', e.target.value)}
                                                rows={4}
                                                placeholder="Tell us about your fitness goals and any questions you have..."
                                                required
                                                className={errors.message ? 'border-red-500' : ''}
                                            />
                                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                                        </div>

                                        <Button 
                                            type="submit" 
                                            className="w-full bg-blue-600 hover:bg-blue-700"
                                            disabled={processing}
                                        >
                                            {processing ? 'Sending...' : 'Send Message'}
                                        </Button>
                                    </form>
                                </div>

                                <div className="space-y-6">
                                    <Card className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose {trainer.name}?</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-start space-x-3">
                                                <Award className="h-5 w-5 text-blue-600 mt-0.5" />
                                                <div>
                                                    <p className="font-medium text-gray-900">Certified Professional</p>
                                                    <p className="text-sm text-gray-600">Multiple certifications and qualifications</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                                <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                                                <div>
                                                    <p className="font-medium text-gray-900">Proven Results</p>
                                                    <p className="text-sm text-gray-600">{trainer.reviewCount}+ satisfied clients</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                                <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                                                <div>
                                                    <p className="font-medium text-gray-900">Personalized Approach</p>
                                                    <p className="text-sm text-gray-600">Tailored programs for your goals</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-6 bg-gray-50">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Response Time</h3>
                                        <p className="text-gray-600 mb-4">
                                            {trainer.name} typically responds to enquiries within 24 hours.
                                        </p>
                                        <div className="flex items-center text-green-600">
                                            <Clock className="h-4 w-4 mr-2" />
                                            <span className="text-sm font-medium">Usually responds quickly</span>
                                        </div>
                                    </Card>

                                    {/* Social Media */}
                                    {(trainer.socialMedia.instagram || trainer.socialMedia.facebook || trainer.socialMedia.youtube) && (
                                        <Card className="p-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Follow {trainer.name}</h3>
                                            <div className="space-y-3">
                                                {trainer.socialMedia.instagram && (
                                                    <a 
                                                        href={trainer.socialMedia.instagram}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center space-x-3 text-gray-600 hover:text-pink-600 transition-colors"
                                                    >
                                                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                                            <span className="text-white text-sm font-bold">IG</span>
                                                        </div>
                                                        <span>Instagram</span>
                                                    </a>
                                                )}
                                                {trainer.socialMedia.facebook && (
                                                    <a 
                                                        href={trainer.socialMedia.facebook}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors"
                                                    >
                                                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                                            <span className="text-white text-sm font-bold">FB</span>
                                                        </div>
                                                        <span>Facebook</span>
                                                    </a>
                                                )}
                                                {trainer.socialMedia.youtube && (
                                                    <a 
                                                        href={trainer.socialMedia.youtube}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center space-x-3 text-gray-600 hover:text-red-600 transition-colors"
                                                    >
                                                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                                                            <span className="text-white text-sm font-bold">YT</span>
                                                        </div>
                                                        <span>YouTube</span>
                                                    </a>
                                                )}
                                            </div>
                                        </Card>
                                    )}

                                    {/* Location Info */}
                                    <Card className="p-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Training Location</h3>
                                        <div className="flex items-start space-x-3 mb-4">
                                            <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="font-medium text-gray-900">{trainer.location}</p>
                                                <p className="text-sm text-gray-600">Primary training location</p>
                                            </div>
                                        </div>
                                        <Link href={`/locations/${trainer.locationSlug}`}>
                                            <Button variant="outline" className="w-full">
                                                View Gym Details
                                            </Button>
                                        </Link>
                                    </Card>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to Transform Your Fitness Journey?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Join the many clients who have achieved their fitness goals with {trainer.name}'s expert guidance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button 
                                size="lg" 
                                className="bg-white text-blue-600 hover:bg-gray-100"
                                onClick={() => setActiveTab('contact')}
                            >
                                Book Consultation
                            </Button>
                            <Link href="/trainers">
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                                    View All Trainers
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}