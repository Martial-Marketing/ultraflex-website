import { Card } from '@/components/ui/card';
import { Star, ChevronRight, Quote, Users } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    quote: string;
    rating: number;
    image: string;
}

interface MemberTestimonialsProps {
    testimonials: Testimonial[];
}

export default function MemberTestimonials({ testimonials }: MemberTestimonialsProps) {
    return (
        <section className="py-20 bg-transparent relative overflow-hidden">
            {/* Animated particles overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 12 }, (_, i) => (
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

            {/* Red accent overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 via-transparent to-red-900/5" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Simplified header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">What Members Say</h2>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        Don't just take our word for it - hear from our amazing community
                    </p>
                </div>
                
                {/* Enhanced testimonial cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.id} className="p-6 text-center bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 hover:shadow-2xl hover:shadow-red-700/10 group relative overflow-hidden">
                            {/* Quote icon background */}
                            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                                <Quote className="h-12 w-12 text-red-700 transform rotate-12" />
                            </div>

                            <div className="mb-6 relative z-10">
                                {/* Enhanced member image with border */}
                                <div className="relative mb-4">
                                    <div className="w-20 h-20 mx-auto rounded-full border-2 border-red-700/30 p-1 group-hover:border-red-700/60 transition-colors duration-300">
                                        <img 
                                            src={testimonial.image} 
                                            alt={testimonial.name}
                                            className="w-full h-full rounded-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    {/* Member indicator */}
                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-red-700 to-red-800 rounded-full flex items-center justify-center border-2 border-black/40">
                                        <Star className="h-3 w-3 text-white fill-white" />
                                    </div>
                                </div>

                                {/* Enhanced star rating */}
                                <div className="flex justify-center mb-4 space-x-1">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            className="h-5 w-5 fill-red-700 text-red-700 group-hover:scale-110 transition-transform duration-300" 
                                            style={{ animationDelay: `${i * 100}ms` }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Enhanced quote with hover effects */}
                            <div className="mb-6 relative">
                                <p className="text-gray-300 mb-4 italic leading-relaxed group-hover:text-white transition-colors duration-300">
                                    "{testimonial.quote}"
                                </p>
                                
                                {/* Quote accent line */}
                                <div className="w-12 h-1 bg-gradient-to-r from-red-700 to-red-800 rounded-full mx-auto opacity-60 group-hover:opacity-100 group-hover:w-16 transition-all duration-300"></div>
                            </div>

                            {/* Enhanced member name with hover effect */}
                            <div className="flex items-center justify-center text-white font-semibold group-hover:text-red-700 transition-colors duration-300 group">
                                <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                    {testimonial.name}
                                </span>
                            </div>

                            {/* Member badge */}
                            <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="inline-flex items-center px-3 py-1 bg-red-700/20 backdrop-blur-sm rounded-full border border-red-700/30 text-xs text-red-700 font-medium">
                                    <Star className="h-3 w-3 mr-1 fill-red-700" />
                                    UltraFlex Member
                                </div>
                            </div>

                            {/* Animated background accent */}
                            <div className="absolute inset-0 bg-gradient-to-br from-red-700/5 via-transparent to-red-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                        </Card>
                    ))}
                </div>



                {/* Bottom accent line */}
                <div className="mt-16 flex items-center justify-center">
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-red-700 to-transparent rounded-full"></div>
                </div>
            </div>
        </section>
    );
}