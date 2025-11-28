import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import type { BreadcrumbItem } from '@/types';
import AIChatbotFAQ from '@/components/AIChatbotFAQ';
import type { ReactNode } from 'react';
import { ToastProviderComponent } from '@/components/ui/toast';
import { usePage } from '@inertiajs/react';

type AuthProps = {
    user: import('@/types').User | null;
};

export interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    auth?: AuthProps;
}

export default ({ children, breadcrumbs, auth, ...props }: AppLayoutProps) => {
    const { url } = usePage();
    const showBack = url !== '/';

    const goBack = () => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    };

    return (
        <ToastProviderComponent>
            <div className="min-h-screen flex flex-col">
                <Navbar auth={auth || { user: null }} />
                {/* Single spacer to offset sticky navbar height across breakpoints */}
                <div className="h-20 md:h-24 xl:h-28" aria-hidden="true" />

                {/* Floating Back button at upper-right, below Navbar */}
                {showBack && (
                    <button
                        onClick={goBack}
                        aria-label="Go Back"
                        className="fixed left-4 top-[76px] md:left-6 md:top-[76px] inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-white bg-black hover:bg-black/90 border border-white/10 z-40 shadow-lg"
                    >
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        <span className="hidden md:inline">Back</span>
                    </button>
                )}

                <main className="flex-1">
                    {children}
                </main>
                <Footer />
                <AIChatbotFAQ />
            </div>
        </ToastProviderComponent>
    );
};
