import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthProps {
    user: User | null;
}

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    auth?: AuthProps;
}

export default ({ children, breadcrumbs, auth, ...props }: AppLayoutProps) => (
    <div className="min-h-screen flex flex-col">
        <Navbar auth={auth || { user: null }} />
        <main className="flex-1">
            {children}
        </main>
        <Footer />
    </div>
);
