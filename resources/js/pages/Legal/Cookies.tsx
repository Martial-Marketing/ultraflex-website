import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Cookies({ auth }: { auth: any }) {
  return (
    <AppLayout auth={auth}>
      <Head title="Cookie Policy" />
      <div className="container mx-auto px-6 py-12 text-white">
        <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
        <p className="text-gray-300">Our use of cookies. This is a placeholder page.</p>
      </div>
    </AppLayout>
  );
}
