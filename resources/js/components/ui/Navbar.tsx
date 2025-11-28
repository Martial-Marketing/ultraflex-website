import { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
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
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
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
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { url } = usePage();


    // Helper functions
    const isActive = (path: string) => {
        if (path === '/') return url === '/';
        return url.startsWith(path);
    };

    const toggleDropdown = (dropdown: string) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const handleMouseEnter = (item: string) => {
        setHoveredItem(item);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
        setActiveDropdown(null);
        setHoveredItem(null);
        setUserMenuOpen(false);
    }, [url]);

    const hubHref = auth?.user ? '/members' : '/login';

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
            label: 'Virtual Tours',
            href: '/tours',
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
            label: 'UF Hub',
            href: hubHref,
            icon: null,
            dropdown: null,
        },
        {
            label: 'Membership',
            href: '/membership',
            icon: null,
            dropdown: null
        },
        {
            label: 'About Us',
            href: '/about',
            icon: null,
            dropdown: null
        },
        {
            label: 'UltraFlex Clothing',
            href: 'https://www.ultraflexclothing.com/',
            icon: null,
            external: true
        },
        {
            label: 'More',
            href: '#',
            dropdown: [
                { label: 'Gallery', href: '/gallery', icon: null },
                { label: 'Latest News', href: '/news', icon: null },
                { label: 'Contact Us', href: '/contact', icon: null },
                // removed UF Hub from More dropdown per request
            ]
        }
    ];

    const handleLogout = () => {
        router.post('/logout');
    };

    const goBack = () => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
            window.history.back();
        } else {
            router.visit('/');
        }
    };

    return (
        <nav className="relative bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg sticky top-0 z-50">
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

            <div className="max-w-screen-2xl w-full mx-auto px-6 relative z-10">
                <div className="flex justify-between items-center h-16">
                    {/* Back Button and Logo Section */}
                    <div className="flex items-center space-x-6 shrink-0 mr-10 md:mr-12 lg:mr-16 xl:mr-20">
                        {/* Logo */}
                        <Link 
                            href="/" 
                            className="flex items-center"
                            onMouseEnter={() => handleMouseEnter('logo')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="w-12 h-10 flex items-center justify-center">
                                <img 
                                    src="/Images/logo/ultraflex-logo.webp" 
                                    alt="UltraFlex Logo" 
                                    className={`h-10 w-auto object-contain transition-all duration-300 ${
                                        hoveredItem === 'logo' 
                                            ? 'drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] scale-110' 
                                            : 'drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]'
                                    }`}
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation (show from 2xl and up to avoid overlap around 1361px) */}
                    <div className="hidden 2xl:flex items-center space-x-8 flex-1 justify-center min-w-0 px-4 xl:px-8 2xl:px-12">
                        {navItems.map((item) => {


                            if (item.dropdown) {
                                return (
                                    <div 
                                        key={item.label} 
                                        className="relative"
                                        onMouseEnter={() => handleMouseEnter(item.label)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <button
                                            onClick={() => toggleDropdown(item.label)}
                                            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                                isActive(item.href) || hoveredItem === item.label
                                                    ? 'text-red-700 bg-red-700/10 border border-red-700/20 shadow-[0_0_15px_rgba(220,38,38,0.5)] scale-105' 
                                                    : 'text-gray-300'
                                            }`}
                                        >
                                            <span className={`transition-transform duration-300 whitespace-nowrap leading-none ${
                                                hoveredItem === item.label ? 'translate-x-1' : ''
                                            }`}>{item.label}</span>
                                            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                                                activeDropdown === item.label || hoveredItem === item.label ? 'rotate-180' : ''
                                            }`} />
                                        </button>

                                        {/* Dropdown Menu - Shows on both hover and click */}
                                        {(activeDropdown === item.label || hoveredItem === item.label) && (
                                            <div className="absolute top-full left-0 mt-1 w-48 bg-black/90 backdrop-blur-md rounded-md shadow-xl border border-white/10 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                                {item.dropdown.map((subItem) => (
                                                    (typeof subItem.href === 'string' && subItem.href.startsWith('http')) ? (
                                                        <a
                                                            key={subItem.href}
                                                            href={subItem.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`flex items-center space-x-2 px-4 py-2 text-sm transition-all duration-300 group ${
                                                                isActive(subItem.href)
                                                                    ? 'text-red-700 bg-red-700/10 shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                                                                    : 'text-gray-300 hover:text-red-700 hover:bg-red-700/10 hover:shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                                                            }`}
                                                        >
                                                            <span className="group-hover:translate-x-1 transition-transform duration-300">{subItem.label}</span>
                                                        </a>
                                                    ) : (
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
                                                    )
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
                                        onMouseEnter={() => handleMouseEnter(item.label)}
                                        onMouseLeave={handleMouseLeave}
                                        className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                            hoveredItem === item.label
                                                ? 'text-red-700 bg-red-700/10 shadow-[0_0_15px_rgba(220,38,38,0.5)] scale-105'
                                                : 'text-gray-300'
                                        }`}
                                    >
                                        <span className={`transition-transform duration-300 whitespace-nowrap leading-none ${
                                            hoveredItem === item.label ? 'translate-x-1' : ''
                                        }`}>{item.label}</span>
                                    </a>
                                );
                            }

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onMouseEnter={() => handleMouseEnter(item.label)}
                                    onMouseLeave={handleMouseLeave}
                                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                        isActive(item.href) || hoveredItem === item.label
                                            ? 'text-red-700 bg-red-700/10 border border-red-700/20 shadow-[0_0_15px_rgba(220,38,38,0.5)] scale-105' 
                                            : 'text-gray-300'
                                    }`}
                                >
                                    <span className={`transition-transform duration-300 whitespace-nowrap leading-none ${
                                        hoveredItem === item.label ? 'translate-x-1' : ''
                                    }`}>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth/CTA Button */}
                    <div className="hidden lg:flex items-center space-x-4 shrink-0 ml-8 lg:ml-10 xl:ml-12">
                        {auth.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 text-gray-300 hover:text-red-700 hover:bg-white/10">
                                        <User className="h-4 w-4" />
                                        <span>{auth.user.name}</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end">
                                    <UserMenuContent user={auth.user} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <a 
                                href="https://secure.ashbournemanagement.co.uk/signupuk/index.aspx?fn=grbh2"
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => handleMouseEnter('register')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Button size="sm" className={`bg-gradient-to-r from-red-700 to-red-800 text-white px-6 py-2 text-sm font-semibold rounded-lg shadow-lg border border-red-700/20 backdrop-blur-sm transition-all duration-300 ${
                                    hoveredItem === 'register' 
                                        ? 'from-red-600 to-red-700 shadow-xl scale-105 shadow-red-500/25' 
                                        : 'hover:from-red-600 hover:to-red-700'
                                }`}>
                                    <span className={`transition-transform duration-300 ${
                                        hoveredItem === 'register' ? 'translate-x-1' : ''
                                    }`}>Sign Up Now</span>
                                </Button>
                            </a>
                        )}
                    </div>

                    {/* Mobile menu button (show until 2xl) */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="2xl:hidden p-2 rounded-md text-gray-300 hover:text-red-700 hover:bg-white/10 transition-all duration-300"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation (visible below 2xl to match toggle) */}
                {isOpen && (
                    <div className="2xl:hidden border-t border-white/10 py-4 animate-in slide-in-from-top duration-300">
                        <div className="space-y-2">
                            {navItems.map((item) => {


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
                                                <div className="ml-6 mt-2 space-y-1 animate-in slide-in-from-left duration-200">
                                                    {item.dropdown.map((subItem) => (
                                                        (typeof subItem.href === 'string' && subItem.href.startsWith('http')) ? (
                                                            <a
                                                                key={subItem.href}
                                                                href={subItem.href}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-all duration-300 group ${
                                                                    isActive(subItem.href)
                                                                        ? 'text-red-700 bg-red-700/10 shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                                                                        : 'text-gray-300 hover:text-red-700 hover:bg-red-700/10 hover:shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                                                                }`}
                                                            >
                                                                <span className="group-hover:translate-x-1 transition-transform duration-300">{subItem.label}</span>
                                                            </a>
                                                        ) : (
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
                                                        )
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
                                        <a 
                                            href="https://secure.ashbournemanagement.co.uk/signupuk/index.aspx?fn=grbh2"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full"
                                        >
                                            <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-red-700/20 backdrop-blur-sm">
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">Sign Up Now</span>
                                            </Button>
                                        </a>
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