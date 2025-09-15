

import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import AppBackButton from '@/components/ui/AppBackButton';
import type { BreadcrumbItem } from '@/types';
import AIChatbotFAQ from '@/components/AIChatbotFAQ';
import type { ReactNode } from 'react';

type AuthProps = {
    user: import('@/types').User | null;
};

export interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    auth?: AuthProps;
}

export default ({ children, breadcrumbs, auth, ...props }: AppLayoutProps) => (
    <div className="min-h-screen flex flex-col">
        <Navbar auth={auth || { user: null }} />
        <AppBackButton />
        <main className="flex-1">
            {children}
        </main>
        <Footer />
        <AIChatbotFAQ />
    </div>
);
