import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export default function FooterCTA() {
    return (
        <section className="bg-gray-900 text-white py-16">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
                <p className="text-xl text-gray-300 mb-8">
                    Join the UltraFlex community today and unlock your potential
                </p>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                    <Link href={route('auth.register')}>Get Started Today</Link>
                </Button>
            </div>
        </section>
    );
}