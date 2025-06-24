import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export default function SignUpCTA() {
    return (
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="mb-6 text-4xl font-bold text-white">
                    Ready to Transform Your Fitness Journey?
                </h2>
                <p className="mb-8 text-xl text-blue-100 max-w-2xl mx-auto">
                    Join thousands of members who have already discovered the UltraFlex difference. 
                    Your transformation starts today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                        <Link href={route('auth.register')}>Start Free Trial</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold">
                        <Link href={route('auth.login')}>Member Login</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}