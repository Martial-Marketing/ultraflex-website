import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

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
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">What Members Say</h2>
                    <p className="text-xl text-gray-600">
                        Don't just take our word for it - hear from our amazing community
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.id} className="p-6 text-center">
                            <div className="mb-4">
                                <img 
                                    src={testimonial.image} 
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                                />
                                <div className="flex justify-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                            <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}