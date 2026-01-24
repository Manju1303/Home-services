'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Home, LogIn, LogOut, User, Settings, Briefcase, Shield } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isAuthenticated, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const getDashboardLink = () => {
        if (!user) return '/dashboard';
        switch (user.role) {
            case 'ADMIN':
                return '/admin/dashboard';
            case 'PROVIDER':
                return '/provider/dashboard';
            default:
                return '/dashboard';
        }
    };

    return (
        <nav className="glass sticky top-0 z-50 border-b border-white/10">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                            <Home className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold gradient-text">HomeServices</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            href="/services"
                            className={`transition-colors duration-300 ${pathname === '/services'
                                    ? 'text-primary-400'
                                    : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            Services
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    href={getDashboardLink()}
                                    className={`flex items-center space-x-1 transition-colors duration-300 ${pathname.includes('dashboard')
                                            ? 'text-primary-400'
                                            : 'text-gray-300 hover:text-white'
                                        }`}
                                >
                                    {user?.role === 'ADMIN' ? (
                                        <Shield className="w-4 h-4" />
                                    ) : user?.role === 'PROVIDER' ? (
                                        <Briefcase className="w-4 h-4" />
                                    ) : (
                                        <User className="w-4 h-4" />
                                    )}
                                    <span>Dashboard</span>
                                </Link>

                                <div className="flex items-center space-x-3">
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-white">{user?.name}</p>
                                        <p className="text-xs text-gray-400">{user?.role}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-all duration-300"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link href="/login" className="btn-outline text-sm">
                                    <LogIn className="w-4 h-4 inline mr-2" />
                                    Login
                                </Link>
                                <Link href="/register" className="btn-primary text-sm">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}
