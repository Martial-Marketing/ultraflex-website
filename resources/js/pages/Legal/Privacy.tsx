import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Privacy({ auth }: { auth: any }) {
  return (
    <AppLayout auth={auth}>
      <Head title="Privacy Policy" />
      <div className="container mx-auto px-6 py-12 text-white">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-300">We respect your privacy. This is a placeholder page.</p>
      </div>
    </AppLayout>
  );
}
