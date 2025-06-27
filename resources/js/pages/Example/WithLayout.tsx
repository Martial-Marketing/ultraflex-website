import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthProps {
    user: User | null;
}

interface WithLayoutProps {
    auth: AuthProps;
}

export default function WithLayout({ auth }: WithLayoutProps) {
    return (
        <AppLayout auth={auth}>
            <Head title="Example Page with Layout - UltraFlex">
                <meta name="description" content="Example page showing how to use the app layout with navbar and footer." />
            </Head>

            <div className="container mx-auto px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">Example Page with Layout</h1>
                    
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Use App Layout</h2>
                        <p className="text-gray-600 mb-4">
                            This page demonstrates how to use the AppLayout component to automatically include
                            the navbar and footer on any page.
                        </p>
                        
                        <div className="bg-gray-50 rounded p-4 mb-4">
                            <h3 className="font-semibold text-gray-800 mb-2">Usage:</h3>
                            <pre className="text-sm text-gray-600">
{`import AppLayout from '@/layouts/app-layout';

export default function MyPage({ auth }) {
    return (
        <AppLayout auth={auth}>
            <Head title="My Page" />
            
            {/* Your page content here */}
            <div className="container mx-auto px-6 py-16">
                <h1>My Page Content</h1>
            </div>
        </AppLayout>
    );
}`}
                            </pre>
                        </div>
                        
                        <div className="bg-blue-50 rounded p-4">
                            <h3 className="font-semibold text-blue-800 mb-2">Benefits:</h3>
                            <ul className="list-disc list-inside text-blue-700 space-y-1">
                                <li>Automatic navbar and footer on every page</li>
                                <li>Consistent layout structure</li>
                                <li>User authentication state passed to navbar</li>
                                <li>Responsive design built-in</li>
                                <li>Easy to maintain and update</li>
                            </ul>
                        </div>
                    </div>
                    
                    {auth.user ? (
                        <div className="bg-green-50 rounded-lg p-6">
                            <h3 className="font-semibold text-green-800 mb-2">Logged in as:</h3>
                            <p className="text-green-700">{auth.user.name} ({auth.user.email})</p>
                        </div>
                    ) : (
                        <div className="bg-yellow-50 rounded-lg p-6">
                            <h3 className="font-semibold text-yellow-800 mb-2">Not logged in</h3>
                            <p className="text-yellow-700">The navbar will show login/register options</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
