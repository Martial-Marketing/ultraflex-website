import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card } from '@/components/ui/card';

export default function JohnDoe() {
  return (
    <AppLayout>
      <Head title="John Doe - Personal Trainer" />
      <div className="min-h-screen bg-black/80 py-16">
        <div className="container mx-auto px-6">
          <Card className="max-w-2xl mx-auto p-8 bg-black/60 border border-white/10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src="/Images/trainers/john-doe.jpg"
                alt="John Doe"
                className="w-40 h-40 rounded-full object-cover border-4 border-red-700/40"
              />
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">John Doe</h1>
                <h2 className="text-lg text-red-700 mb-4">Personal Trainer</h2>
                <p className="text-gray-300 mb-4">
                  John is a certified personal trainer with 10+ years of experience helping clients achieve their fitness goals. He specializes in strength training, weight loss, and functional movement.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-red-700/20 text-red-700 text-sm rounded-full">Strength</span>
                  <span className="px-3 py-1 bg-red-700/20 text-red-700 text-sm rounded-full">Weight Loss</span>
                  <span className="px-3 py-1 bg-red-700/20 text-red-700 text-sm rounded-full">Mobility</span>
                </div>
                <Link href="/contact">
                  <button className="bg-gradient-to-r from-red-700 to-red-800 text-white px-6 py-2 rounded shadow hover:from-red-600 hover:to-red-700 transition-all duration-300">
                    Book a Session
                  </button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
