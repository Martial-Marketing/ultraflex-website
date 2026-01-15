
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card } from '@/components/ui/card';

type Trainer = {
  name: string;
  image: string;
  bio: string;
  specialties: string[];
  experience: string;
  certifications: string[];
  location: string;
  rating: number;
  reviewCount: number;
  slug: string;
  contact?: {
    instagram?: string;
    facebook?: string;
    phone?: string;
    email?: string;
    website?: string;
  };
};


export default function TrainerProfile() {
  // Dummy data fallback for demonstration
  const { props } = usePage();
  const trainer: Trainer = (props.trainer as Trainer) || {
    name: 'Trainer Name',
    image: '/Images/trainers/default.jpg',
    bio: 'This is a sample bio for the trainer. Replace with real data.',
    specialties: ['Specialty 1', 'Specialty 2'],
    experience: '5+ years',
    certifications: ['Certification 1'],
    location: 'Sample Location',
    rating: 4.8,
    reviewCount: 42,
    slug: 'trainer-name',
    contact: {
      instagram: undefined,
      facebook: undefined,
      phone: undefined,
      email: undefined,
      website: undefined,
    },
  };

  return (
    <AppLayout>
      <Head title={`${trainer.name} - Personal Trainer`} />
      <div className="min-h-screen bg-black/80 py-16">
        <div className="container mx-auto px-6">
          <Card className="max-w-2xl mx-auto p-8 bg-black/60 border border-white/10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-40 h-40 rounded-full object-cover border-4 border-red-700/40"
              />
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{trainer.name}</h1>
                <h2 className="text-lg text-red-700 mb-4">Personal Trainer</h2>
                {trainer.location && (
                  <p className="text-gray-400 mb-4">{trainer.location}</p>
                )}
                <p className="text-gray-300 mb-6">{trainer.bio}</p>
                {/* Contact & booking */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2">
                    {trainer.contact?.instagram && (
                      <a href={trainer.contact.instagram} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded bg-white/10 text-white text-sm hover:bg-white/20 transition">
                        Instagram
                      </a>
                    )}
                    {trainer.contact?.facebook && (
                      <a href={trainer.contact.facebook} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded bg-white/10 text-white text-sm hover:bg-white/20 transition">
                        Facebook
                      </a>
                    )}
                    {trainer.contact?.website && (
                      <a href={trainer.contact.website} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded bg-white/10 text-white text-sm hover:bg-white/20 transition">
                        Website
                      </a>
                    )}
                    {trainer.contact?.email && (
                      <a href={`mailto:${trainer.contact.email}`} className="px-3 py-2 rounded bg-white/10 text-white text-sm hover:bg-white/20 transition">
                        Email
                      </a>
                    )}
                    {trainer.contact?.phone && (
                      <a href={`tel:${trainer.contact.phone}`} className="px-3 py-2 rounded bg-white/10 text-white text-sm hover:bg-white/20 transition">
                        Call
                      </a>
                    )}
                  </div>
                  <Link href="/contact">
                    <button className="bg-gradient-to-r from-red-700 to-red-800 text-white px-6 py-2 rounded shadow hover:from-red-600 hover:to-red-700 transition-all duration-300">
                      Book a Session
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
