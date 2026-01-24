'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle, ArrowRight, Star } from 'lucide-react';

interface Booking {
    id: string;
    bookingDate: string;
    startTime: string;
    hours: number;
    totalPrice: number;
    status: string;
    address: string;
    service: {
        name: string;
    };
    provider?: {
        user: {
            name: string;
        };
    };
}

const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
    PENDING: { color: 'text-yellow-400 bg-yellow-400/10', icon: AlertCircle, label: 'Pending' },
    CONFIRMED: { color: 'text-blue-400 bg-blue-400/10', icon: CheckCircle, label: 'Confirmed' },
    IN_PROGRESS: { color: 'text-purple-400 bg-purple-400/10', icon: Clock, label: 'In Progress' },
    COMPLETED: { color: 'text-green-400 bg-green-400/10', icon: CheckCircle, label: 'Completed' },
    CANCELLED: { color: 'text-red-400 bg-red-400/10', icon: XCircle, label: 'Cancelled' },
};

export default function DashboardPage() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuthStore();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        fetchBookings();
    }, [isAuthenticated]);

    const fetchBookings = async () => {
        try {
            const response = await api.get('/users/bookings');
            setBookings(response.data.bookings);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
            // Mock data for demo
            setBookings([
                {
                    id: '1',
                    bookingDate: '2024-01-25',
                    startTime: '10:00',
                    hours: 3,
                    totalPrice: 900,
                    status: 'CONFIRMED',
                    address: '123 Main Street, Bangalore',
                    service: { name: 'Deep Cleaning' },
                    provider: { user: { name: 'Priya Sharma' } },
                },
                {
                    id: '2',
                    bookingDate: '2024-01-20',
                    startTime: '14:00',
                    hours: 2,
                    totalPrice: 500,
                    status: 'COMPLETED',
                    address: '456 Park Avenue, Mumbai',
                    service: { name: 'Plumber' },
                    provider: { user: { name: 'Rajesh Kumar' } },
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const filteredBookings = bookings.filter((booking) => {
        if (filter === 'all') return true;
        return booking.status.toLowerCase() === filter;
    });

    const stats = {
        total: bookings.length,
        completed: bookings.filter((b) => b.status === 'COMPLETED').length,
        pending: bookings.filter((b) => b.status === 'PENDING' || b.status === 'CONFIRMED').length,
        totalSpent: bookings.filter((b) => b.status === 'COMPLETED').reduce((sum, b) => sum + b.totalPrice, 0),
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="spinner w-12 h-12"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8 animate-fadeIn">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        Welcome back, <span className="gradient-text">{user?.name}</span>
                    </h1>
                    <p className="text-slate-400">Here is an overview of your bookings</p>
                </div>

                {/* Stats Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="card animate-slideUp">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm">Total Bookings</p>
                                <p className="text-3xl font-bold">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-indigo-400" />
                            </div>
                        </div>
                    </div>

                    <div className="card animate-slideUp delay-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm">Completed</p>
                                <p className="text-3xl font-bold text-green-400">{stats.completed}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-400" />
                            </div>
                        </div>
                    </div>

                    <div className="card animate-slideUp delay-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm">Active</p>
                                <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                                <Clock className="w-6 h-6 text-yellow-400" />
                            </div>
                        </div>
                    </div>

                    <div className="card animate-slideUp delay-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm">Total Spent</p>
                                <p className="text-3xl font-bold gradient-text">Rs.{stats.totalSpent}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                <Star className="w-6 h-6 text-purple-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bookings Section */}
                <div className="card-premium animate-fadeIn">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <h2 className="text-xl font-semibold">Your Bookings</h2>

                        {/* Filter Tabs */}
                        <div className="flex gap-2">
                            {['all', 'pending', 'confirmed', 'completed'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${filter === status
                                            ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                                            : 'text-slate-400 hover:bg-white/5'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bookings List */}
                    {filteredBookings.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 mx-auto mb-6 bg-slate-800/50 rounded-full flex items-center justify-center">
                                <Calendar className="w-10 h-10 text-slate-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No bookings found</h3>
                            <p className="text-slate-400 mb-6">Start by booking your first service</p>
                            <Link href="/services" className="btn-primary inline-flex items-center gap-2">
                                Browse Services
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredBookings.map((booking) => {
                                const status = statusConfig[booking.status] || statusConfig.PENDING;
                                const StatusIcon = status.icon;

                                return (
                                    <div
                                        key={booking.id}
                                        className="bg-slate-800/30 rounded-xl p-5 hover:bg-slate-800/50 transition-all duration-300"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold">{booking.service.name}</h3>
                                                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                                                        <StatusIcon className="w-3 h-3" />
                                                        {status.label}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {new Date(booking.bookingDate).toLocaleDateString('en-IN', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        })}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        {booking.startTime} ({booking.hours} hrs)
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {booking.address}
                                                    </span>
                                                </div>
                                                {booking.provider && (
                                                    <p className="text-sm text-slate-500 mt-2">
                                                        Provider: {booking.provider.user.name}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold gradient-text">Rs.{booking.totalPrice}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
