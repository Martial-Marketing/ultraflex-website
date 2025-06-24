import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
    MapPin, 
    Phone, 
    Mail, 
    Clock, 
    MessageSquare,
    Send,
    Users,
    HelpCircle,
    Calendar
} from 'lucide-react';

interface Location {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}

interface GeneralContact {
    phone: string;
    email: string;
    address: string;
}

interface ContactIndexProps {
    locations: Location[];
    generalContact: GeneralContact;
    auth: {
        user: any;
    };
}

export default function ContactIndex({ locations, generalContact }: ContactIndexProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => {
                reset();
            }
        });
    };

    const contactReasons = [
        {
            title: 'General Enquiries',
            description: 'Questions about membership, facilities, or services',
            icon: HelpCircle,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            title: 'Personal Training',
            description: 'Book sessions or learn about our trainers',
            icon: Users,
            color: 'bg-green-100 text-green-600'
        },
        {
            title: 'Class Bookings',
            description: 'Schedule group fitness classes',
            icon: Calendar,
            color: 'bg-purple-100 text-purple-600'
        },
        {
            title: 'Feedback',
            description: 'Share your experience or suggestions',
            icon: MessageSquare,
            color: 'bg-orange-100 text-orange-600'
        }
    ];

    return (
        <>
            <Head title="Contact Us - UltraFlex">
                <meta name="description" content="Get in touch with UltraFlex. Find our locations, contact information, and send us a message. We're here to help with all your fitness needs." />
            </Head>

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-5xl font-bold text-white mb-6">Contact Us</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Have questions? We're here to help! Reach out to us for membership information, 
                            personal training, class bookings, or any other enquiries.
                        </p>
                    </div>
                </section>

                {/* Quick Contact Options */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How Can We Help?</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {contactReasons.map((reason, index) => {
                                const IconComponent = reason.icon;
                                return (
                                    <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                                        <div className={`w-12 h-12 ${reason.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                            <IconComponent className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{reason.title}</h3>
                                        <p className="text-gray-600 text-sm">{reason.description}</p>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Contact Form and Info */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
                                
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
                                            placeholder="Your full name"
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <Input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                            className={errors.email ? 'border-red-500' : ''}
                                            placeholder="your.email@example.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject
                                        </label>
                                        <Input
                                            type="text"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            required
                                            className={errors.subject ? 'border-red-500' : ''}
                                            placeholder="What is your enquiry about?"
                                        />
                                        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Message
                                        </label>
                                        <Textarea
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            rows={6}
                                            required
                                            className={errors.message ? 'border-red-500' : ''}
                                            placeholder="Please provide details about your enquiry..."
                                        />
                                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                                    </div>

                                    <Button 
                                        type="submit" 
                                        className="w-full bg-blue-600 hover:bg-blue-700"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            'Sending...'
                                        ) : (
                                            <>
                                                <Send className="h-4 w-4 mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>

                                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                        <strong>Response Time:</strong> We typically respond to enquiries within 24 hours during business days.
                                    </p>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
                                    
                                    {/* General Contact */}
                                    <Card className="p-6 mb-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">General Contact</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3">
                                                <Phone className="h-5 w-5 text-gray-400" />
                                                <span className="text-gray-600">{generalContact.phone}</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Mail className="h-5 w-5 text-gray-400" />
                                                <span className="text-gray-600">{generalContact.email}</span>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                                                <span className="text-gray-600">{generalContact.address}</span>
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Business Hours */}
                                    <Card className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                            <Clock className="h-5 w-5 mr-2" />
                                            Business Hours
                                        </h3>
                                        <div className="space-y-2 text-gray-600">
                                            <div className="flex justify-between">
                                                <span>Monday - Friday:</span>
                                                <span>9:00 AM - 8:00 PM</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Saturday:</span>
                                                <span>9:00 AM - 6:00 PM</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Sunday:</span>
                                                <span>10:00 AM - 4:00 PM</span>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                {/* Alternative Contact Methods */}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Other Ways to Reach Us</h3>
                                    <div className="space-y-3">
                                        <Link href="/trainers" className="block">
                                            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                                                <div className="flex items-center space-x-3">
                                                    <Users className="h-5 w-5 text-blue-600" />
                                                    <div>
                                                        <p className="font-medium text-gray-900">Personal Training</p>
                                                        <p className="text-sm text-gray-600">Contact trainers directly</p>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>

                                        <Link href="/locations" className="block">
                                            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                                                <div className="flex items-center space-x-3">
                                                    <MapPin className="h-5 w-5 text-green-600" />
                                                    <div>
                                                        <p className="font-medium text-gray-900">Visit a Location</p>
                                                        <p className="text-sm text-gray-600">Speak with our staff in person</p>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Location Cards */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Locations</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {locations.map((location) => (
                                <Card key={location.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">{location.name}</h3>
                                        
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-start space-x-3">
                                                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-600 text-sm">{location.address}</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                                <span className="text-gray-600 text-sm">{location.phone}</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                                <span className="text-gray-600 text-sm">{location.email}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Button 
                                                variant="outline" 
                                                className="w-full"
                                                onClick={() => window.open(`https://maps.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`, '_blank')}
                                            >
                                                <MapPin className="h-4 w-4 mr-2" />
                                                Get Directions
                                            </Button>
                                            <Link href={`/locations/${location.id}`} className="block w-full">
                                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                                    View Location Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">What are your membership options?</h3>
                                <p className="text-gray-600 text-sm">
                                    We offer flexible membership plans including monthly, annual, and day passes. 
                                    Visit any location for detailed pricing and package options.
                                </p>
                            </Card>

                            <Card className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need to book classes in advance?</h3>
                                <p className="text-gray-600 text-sm">
                                    Most group fitness classes can be booked online or through our app. 
                                    Some popular classes may require advance booking.
                                </p>
                            </Card>

                            <Card className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I freeze my membership?</h3>
                                <p className="text-gray-600 text-sm">
                                    Yes, we offer membership freezes for various circumstances. 
                                    Contact us to discuss your specific situation and available options.
                                </p>
                            </Card>

                            <Card className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer personal training?</h3>
                                <p className="text-gray-600 text-sm">
                                    Absolutely! We have certified personal trainers available at all locations. 
                                    Book a consultation to find the perfect trainer for your goals.
                                </p>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Map Section Placeholder */}
                <section className="py-16 bg-gray-100">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Find Us</h2>
                        <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                            <div className="text-center text-gray-500">
                                <MapPin className="h-16 w-16 mx-auto mb-4" />
                                <p className="text-lg font-medium">Interactive Map</p>
                                <p className="text-sm">Google Maps integration would go here</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}