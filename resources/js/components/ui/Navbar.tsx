import { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { 
    Menu, 
    X, 
    ChevronDown, 
    MapPin, 
    Users, 
    Dumbbell, 
    BookOpen, 
    Shirt, 
    Camera, 
    Mail, 
    Newspaper,
    User,
    LogOut,
    ChevronRight
} from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthProps {
    user: User | null;
}

interface NavbarProps {
    auth: AuthProps;
}

export default function Navbar({ auth }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const { url } = usePage();

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
        setActiveDropdown(null);
    }, [url]);

    const isActive = (path: string) => {
        if (path === '/') return url === '/';
        return url.startsWith(path);
    };

    const toggleDropdown = (dropdown: string) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const navItems = [
        {
            label: 'Home',
            href: '/',
            icon: null
        },
        {
            label: 'Locations',
            href: '/locations',
            icon: null,
            dropdown: null
        },
        {
            label: 'Personal Trainers',
            href: '/trainers',
            icon: null,
            dropdown: null
        },
        {
            label: 'Equipment',
            href: '/equipment',
            icon: null,
            dropdown: null
        },
        {
            label: 'Members Hub',
            href: '/members',
            icon: null,
            requiresAuth: true,
            dropdown: [
                { label: 'Workouts', href: '/members/workouts', icon: null },
                { label: 'Nutrition', href: '/members/nutrition', icon: null }
            ]
        },
        {
            label: 'UltraFlex Clothing',
            href: 'https://clothing.ultraflex.com', // External link
            icon: null,
            external: true
        },
        {
            label: 'More',
            href: '#',
            icon: <ChevronDown className="h-4 w-4" />,
            dropdown: [
                { label: 'Gym Tours', href: '/tours', icon: null },
                { label: 'Latest News', href: '/news', icon: null },
                { label: 'Contact Us', href: '/contact', icon: null }
            ]
        }
    ];

    const handleLogout = () => {
        // Use Inertia's router for logout with POST method
        router.post('/logout');
    };

    return (
        <nav className="bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg sticky top-0 z-50">
            {/* Animated particles overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 5 }, (_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="w-12 h-10 flex items-center justify-center">
                            <img 
                                src="/Images/logo/ultra-flex-200x167 (1).png" 
                                alt="UltraFlex Logo" 
                                className="h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(220,38,38,0.5)] hover:drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] transition-all duration-300"
                            />
                        </div>
                        <div className="text-2xl font-bold">
                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">ULTRA</span>
                            <span className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">FLEX</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navItems.map((item) => {
                            // Skip Members Hub if user is not authenticated
                            if (item.requiresAuth && !auth.user) return null;

                            if (item.dropdown) {
                                return (
                                    <div key={item.label} className="relative group">
                                        <button
                                            onClick={() => toggleDropdown(item.label)}
                                            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group ${
                                                isActive(item.href) 
                                                    ? 'text-red-700 bg-red-700/10 border border-red-700/20 shadow-[0_0_15px_rgba(220,38,38,0.5)]' 
                                                    : 'text-gray-300 hover:text-red-700 hover:bg-red-700/10 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                                            }`}
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                                            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                                                activeDropdown === item.label ? 'rotate-180' : ''
                                            }`} />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {activeDropdown === item.label && (
                                            <div className="absolute top-full left-0 mt-1 w-48 bg-black/90 backdrop-blur-md rounded-md shadow-xl border border-white/10 py-1 z-50">
                                                {item.dropdown.map((subItem) => (
                                                    <Link
                                                        key={subItem.href}
                                                        href={subItem.href}
                                                        className={`flex items-center space-x-2 px-4 py-2 text-sm transition-all duration-300 group ${
                                                            isActive(subItem.href)
                                                                ? 'text-red-700 bg-red-700/10 shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                                                                : 'text-gray-300 hover:text-red-700 hover:bg-red-700/10 hover:shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                                                        }`}
                                                    >
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">{subItem.label}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            if (item.external) {
                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-red-700 hover:bg-red-700/10 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-300 group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                                    </a>
                                );
                            }

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group ${
                                        isActive(item.href) 
                                            ? 'text-red-700 bg-red-700/10 border border-red-700/20 shadow-[0_0_15px_rgba(220,38,38,0.5)]' 
                                            : 'text-gray-300 hover:text-red-700 hover:bg-red-700/10 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                                    }`}
                                >
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {auth.user ? (
                            <div className="relative group">
                                <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-red-700 hover:bg-white/10 transition-all duration-300">
                                    <User className="h-4 w-4" />
                                    <span>{auth.user.name}</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                                
                                <div className="absolute top-full right-0 mt-1 w-48 bg-black/90 backdrop-blur-md rounded-md shadow-xl border border-white/10 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <Link
                                        href="/members"
                                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-red-700 hover:bg-red-700/10 hover:shadow-[0_0_10px_rgba(220,38,38,0.4)] transition-all duration-300 group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">Members Hub</span>
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-red-700 hover:bg-red-700/10 hover:shadow-[0_0_10px_rgba(220,38,38,0.4)] transition-all duration-300 group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">Profile</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-red-700 hover:bg-red-700/10 hover:shadow-[0_0_10px_rgba(220,38,38,0.4)] transition-all duration-300 group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">Logout</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="outline" size="sm" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white px-6 py-2 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">Login</span>
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="sm" className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-red-700/20 backdrop-blur-sm">
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">Join Now</span>
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-md text-gray-300 hover:text-red-700 hover:bg-white/10 transition-all duration-300"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="lg:hidden border-t border-white/10 py-4">
                        <div className="space-y-2">
                            {navItems.map((item) => {
                                // Skip Members Hub if user is not authenticated
                                if (item.requiresAuth && !auth.user) return null;

                                if (item.dropdown) {
                                    return (
                                        <div key={item.label}>
                                            <button
                                                onClick={() => toggleDropdown(`mobile-${item.label}`)}
                                                className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-red-700 hover:bg-red-700/10 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-300"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <span className="hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                                                </div>
                                                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                                                    activeDropdown === `mobile-${item.label}` ? 'rotate-180' : ''
                                                }`} />
                                            </button>

                                            {activeDropdown === `mobile-${item.label}` && (
                                                <div className="ml-6 mt-2 space-y-1">
                                                    {item.dropdown.map((subItem) => (
                                                        <Link
                                                            key={subItem.href}
                                                            href={subItem.href}
                                                            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-all duration-300 group ${
                                                                isActive(subItem.href)
                                                                    ? 'text-red-700 bg-red-700/10 shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                                                                    : 'text-gray-300 hover:text-red-700 hover:bg-red-700/10 hover:shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                                                            }`}
                                                        >
                                                            <span className="group-hover:translate-x-1 transition-transform duration-300">{subItem.label}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                if (item.external) {
                                    return (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-red-700 hover:bg-red-700/10 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-300 group"
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                                        </a>
                                    );
                                }

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group ${
                                            isActive(item.href) 
                                                ? 'text-red-700 bg-red-700/10 border border-red-700/20 shadow-[0_0_15px_rgba(220,38,38,0.5)]' 
                                                : 'text-gray-300 hover:text-red-700 hover:bg-red-700/10 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                                        }`}
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                                    </Link>
                                );
                            })}

                            {/* Mobile Auth Buttons */}
                            <div className="pt-4 border-t border-white/10">
                                {auth.user ? (
                                    <div className="space-y-2">
                                        <div className="px-3 py-2 text-sm font-medium text-white">
                                            Welcome, {auth.user.name}
                                        </div>
                                        <Link
                                            href="/profile"
                                            className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-gray-300 hover:text-red-700 hover:bg-red-700/10 hover:shadow-[0_0_10px_rgba(220,38,38,0.4)] transition-all duration-300 group"
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">Profile</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-sm text-gray-300 hover:text-red-700 hover:bg-red-700/10 hover:shadow-[0_0_10px_rgba(220,38,38,0.4)] transition-all duration-300 group"
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">Logout</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Link href="/login" className="block w-full">
                                            <Button variant="outline" className="w-full border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white px-6 py-3 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">Login</span>
                                            </Button>
                                        </Link>
                                        <Link href="/register" className="block w-full">
                                            <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-red-700/20 backdrop-blur-sm">
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">Join Now</span>
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}