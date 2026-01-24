'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Menu, X, User, LogOut, Home, Grid, Calendar, Settings } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const { isAuthenticated, user, logout } = useAuthStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'HOME', icon: Home },
        { href: '/services', label: 'SERVICES', icon: Grid },
    ];

    const authLinks = isAuthenticated
        ? [
            { href: '/dashboard', label: 'DASHBOARD', icon: Calendar },
            ...(user?.role === 'PROVIDER'
                ? [{ href: '/provider/dashboard', label: 'PROVIDER', icon: Settings }]
                : []),
            ...(user?.role === 'ADMIN'
                ? [{ href: '/admin/dashboard', label: 'ADMIN', icon: Settings }]
                : []),
        ]
        : [];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-neon">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold neon-font gradient-text">
                        HOMESERVICES
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 neon-font text-sm ${pathname === link.href
                                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                        : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10'
                                    }`}
                            >
                                <link.icon className="w-4 h-4" />
                                {link.label}
                            </Link>
                        ))}
                        {authLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 neon-font text-sm ${pathname === link.href
                                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                        : 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/10'
                                    }`}
                            >
                                <link.icon className="w-4 h-4" />
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm neon-font">{user?.name}</span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all duration-300 neon-font text-sm"
                                >
                                    <LogOut className="w-4 h-4" />
                                    LOGOUT
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-5 py-2 text-gray-300 hover:text-cyan-400 transition-colors neon-font text-sm"
                                >
                                    LOGIN
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-5 py-2 rounded-lg border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 neon-font text-sm"
                                    style={{ textShadow: '0 0 10px rgba(0, 245, 255, 0.5)' }}
                                >
                                    SIGN UP
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-cyan-400 hover:text-white"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-cyan-500/20 animate-fadeIn">
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg neon-font ${pathname === link.href
                                            ? 'bg-cyan-500/20 text-cyan-400'
                                            : 'text-gray-400 hover:bg-cyan-500/10'
                                        }`}
                                >
                                    <link.icon className="w-5 h-5" />
                                    {link.label}
                                </Link>
                            ))}
                            {authLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-purple-500/10 neon-font"
                                >
                                    <link.icon className="w-5 h-5" />
                                    {link.label}
                                </Link>
                            ))}
                            <div className="border-t border-cyan-500/20 mt-2 pt-4">
                                {isAuthenticated ? (
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-lg neon-font"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        LOGOUT
                                    </button>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <Link
                                            href="/login"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="px-4 py-3 text-center text-gray-300 hover:bg-cyan-500/10 rounded-lg neon-font"
                                        >
                                            LOGIN
                                        </Link>
                                        <Link
                                            href="/register"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="px-4 py-3 text-center border border-cyan-500/50 text-cyan-400 rounded-lg neon-font"
                                        >
                                            SIGN UP
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
