import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
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
    LogOut
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
            icon: <MapPin className="h-4 w-4" />,
            dropdown: null
        },
        {
            label: 'Personal Trainers',
            href: '/trainers',
            icon: <Users className="h-4 w-4" />,
            dropdown: null
        },
        {
            label: 'Equipment',
            href: '/equipment',
            icon: <Dumbbell className="h-4 w-4" />,
            dropdown: null
        },
        {
            label: 'Members Hub',
            href: '/members',
            icon: <BookOpen className="h-4 w-4" />,
            requiresAuth: true,
            dropdown: [
                { label: 'Workouts', href: '/members/workouts', icon: <Dumbbell className="h-4 w-4" /> },
                { label: 'Nutrition', href: '/members/nutrition', icon: <BookOpen className="h-4 w-4" /> }
            ]
        },
        {
            label: 'UltraFlex Clothing',
            href: 'https://clothing.ultraflex.com', // External link
            icon: <Shirt className="h-4 w-4" />,
            external: true
        },
        {
            label: 'More',
            href: '#',
            icon: <ChevronDown className="h-4 w-4" />,
            dropdown: [
                { label: 'Gym Tours', href: '/tours', icon: <Camera className="h-4 w-4" /> },
                { label: 'Latest News', href: '/news', icon: <Newspaper className="h-4 w-4" /> },
                { label: 'Contact Us', href: '/contact', icon: <Mail className="h-4 w-4" /> }
            ]
        }
    ];

    const handleLogout = () => {
        // Use Inertia's router for logout
        window.location.href = '/logout';
    };

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="text-2xl font-bold">
                            ULTRA<span className="text-blue-600">FLEX</span>
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
                                            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                                isActive(item.href) 
                                                    ? 'text-blue-600 bg-blue-50' 
                                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            {item.icon}
                                            <span>{item.label}</span>
                                            <ChevronDown className={`h-4 w-4 transition-transform ${
                                                activeDropdown === item.label ? 'rotate-180' : ''
                                            }`} />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {activeDropdown === item.label && (
                                            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border py-1 z-50">
                                                {item.dropdown.map((subItem) => (
                                                    <Link
                                                        key={subItem.href}
                                                        href={subItem.href}
                                                        className={`flex items-center space-x-2 px-4 py-2 text-sm transition-colors ${
                                                            isActive(subItem.href)
                                                                ? 'text-blue-600 bg-blue-50'
                                                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        {subItem.icon}
                                                        <span>{subItem.label}</span>
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
                                        className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </a>
                                );
                            }

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive(item.href) 
                                            ? 'text-blue-600 bg-blue-50' 
                                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {auth.user ? (
                            <div className="relative group">
                                <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">
                                    <User className="h-4 w-4" />
                                    <span>{auth.user.name}</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                                
                                <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg border py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <Link
                                        href="/members"
                                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                                    >
                                        <BookOpen className="h-4 w-4" />
                                        <span>Members Hub</span>
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                                    >
                                        <User className="h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="outline" size="sm">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                        Join Now
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="lg:hidden border-t border-gray-200 py-4">
                        <div className="space-y-2">
                            {navItems.map((item) => {
                                // Skip Members Hub if user is not authenticated
                                if (item.requiresAuth && !auth.user) return null;

                                if (item.dropdown) {
                                    return (
                                        <div key={item.label}>
                                            <button
                                                onClick={() => toggleDropdown(`mobile-${item.label}`)}
                                                className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    {item.icon}
                                                    <span>{item.label}</span>
                                                </div>
                                                <ChevronDown className={`h-4 w-4 transition-transform ${
                                                    activeDropdown === `mobile-${item.label}` ? 'rotate-180' : ''
                                                }`} />
                                            </button>

                                            {activeDropdown === `mobile-${item.label}` && (
                                                <div className="ml-6 mt-2 space-y-1">
                                                    {item.dropdown.map((subItem) => (
                                                        <Link
                                                            key={subItem.href}
                                                            href={subItem.href}
                                                            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                                                                isActive(subItem.href)
                                                                    ? 'text-blue-600 bg-blue-50'
                                                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            {subItem.icon}
                                                            <span>{subItem.label}</span>
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
                                            className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                                        >
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </a>
                                    );
                                }

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            isActive(item.href) 
                                                ? 'text-blue-600 bg-blue-50' 
                                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}

                            {/* Mobile Auth Buttons */}
                            <div className="pt-4 border-t border-gray-200">
                                {auth.user ? (
                                    <div className="space-y-2">
                                        <div className="px-3 py-2 text-sm font-medium text-gray-900">
                                            Welcome, {auth.user.name}
                                        </div>
                                        <Link
                                            href="/profile"
                                            className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                                        >
                                            <User className="h-4 w-4" />
                                            <span>Profile</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Link href="/login" className="block w-full">
                                            <Button variant="outline" className="w-full">
                                                Login
                                            </Button>
                                        </Link>
                                        <Link href="/register" className="block w-full">
                                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                                Join Now
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