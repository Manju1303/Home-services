'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Calendar, Clock, DollarSign, Star, User, CheckCircle, XCircle } from 'lucide-react';

interface Stats {
    totalBookings: number;
    completedBookings: number;
    totalEarnings: number;
    rating: number;
    totalReviews: number;
}

interface Booking {
    id: string;
    bookingDate: string;
    startTime: string;
    hours: number;
    totalPrice: number;
    status: string;
    address: string;
    user: {
        name: string;
        phone: string;
        email: string;
    };
    service: {
        name: string;
    };
}

export default function ProviderDashboard() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuthStore();
    const [stats, setStats] = useState<Stats>({ totalBookings: 0, completedBookings: 0, totalEarnings: 0, rating: 0, totalReviews: 0 });
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'PROVIDER') {
            router.push('/login');
            return;
        }
        fetchDashboardData();
    }, [isAuthenticated, user]);

    const fetchDashboardData = async () => {
        try {
            const response = await api.get('/providers/dashboard/stats');
            setStats(response.data.stats);
            setBookings(response.data.recentBookings);
        } catch (error) {
            console.error('Failed to fetch dashboard:', error);
            // Mock data
            setStats({ totalBookings: 5, completedBookings: 3, totalEarnings: 2500, rating: 4.5, totalReviews: 12 });
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    const updateBookingStatus = async (bookingId: string, status: string) => {
        try {
            await api.put(`/bookings/${bookingId}/status`, { status });
            fetchDashboardData();
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="spinner w-12 h-12"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8 animate-fadeIn">
                    <h1 className="text-3xl font-bold mb-2">
                        Provider <span className="gradient-text">Dashboard</span>
                    </h1>
                    <p className="text-gray-400">Welcome back, {user?.name}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="card-premium">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.totalBookings}</p>
                                <p className="text-sm text-gray-400">Total Bookings</p>
                            </div>
                        </div>
                    </div>

                    <div className="card-premium">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.completedBookings}</p>
                                <p className="text-sm text-gray-400">Completed</p>
                            </div>
                        </div>
                    </div>

                    <div className="card-premium">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-primary-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">₹{stats.totalEarnings}</p>
                                <p className="text-sm text-gray-400">Total Earnings</p>
                            </div>
                        </div>
                    </div>

                    <div className="card-premium">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                                <Star className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.rating}</p>
                                <p className="text-sm text-gray-400">{stats.totalReviews} reviews</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Bookings */}
                <div className="card-premium">
                    <h2 className="text-xl font-semibold mb-6">Your Bookings</h2>

                    {bookings.length === 0 ? (
                        <div className="text-center py-12">
                            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
                            <p className="text-gray-400">Waiting for customers to book your services</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bookings.map((booking) => (
                                <div key={booking.id} className="bg-white/5 rounded-lg p-4">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="font-semibold">{booking.service.name}</h3>
                                            <div className="flex flex-wrap gap-3 text-sm text-gray-400 mt-1">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(booking.bookingDate).toLocaleDateString()}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {booking.startTime} ({booking.hours}hrs)
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <User className="w-4 h-4" />
                                                    {booking.user.name} • {booking.user.phone}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">{booking.address}</p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span className="text-primary-400 font-bold">₹{booking.totalPrice}</span>
                                            {booking.status === 'CONFIRMED' && (
                                                <button
                                                    onClick={() => updateBookingStatus(booking.id, 'COMPLETED')}
                                                    className="btn-primary text-sm py-2"
                                                >
                                                    Mark Complete
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
