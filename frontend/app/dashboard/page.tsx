'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Calendar, Clock, MapPin, User, CheckCircle, XCircle, Star, CreditCard } from 'lucide-react';

interface Booking {
    id: string;
    bookingDate: string;
    startTime: string;
    hours: number;
    totalPrice: number;
    status: string;
    paymentStatus: string;
    address: string;
    service: {
        name: string;
        category: string;
    };
    provider: {
        user: {
            name: string;
            phone: string;
        };
    };
}

const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-500/20 text-yellow-400',
    CONFIRMED: 'bg-blue-500/20 text-blue-400',
    IN_PROGRESS: 'bg-purple-500/20 text-purple-400',
    COMPLETED: 'bg-green-500/20 text-green-400',
    CANCELLED: 'bg-red-500/20 text-red-400',
};

export default function DashboardPage() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuthStore();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

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
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
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
                        Welcome, <span className="gradient-text">{user?.name}</span>
                    </h1>
                    <p className="text-gray-400">Manage your bookings and profile</p>
                </div>

                {/* Quick Actions */}
                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                    <Link href="/services" className="card hover:border-primary-500/50 transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                                <Calendar className="w-6 h-6 text-primary-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Book Service</h3>
                                <p className="text-sm text-gray-400">Schedule new service</p>
                            </div>
                        </div>
                    </Link>

                    <div className="card">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold">{bookings.filter(b => b.status === 'COMPLETED').length}</h3>
                                <p className="text-sm text-gray-400">Completed</p>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                                <Clock className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold">{bookings.filter(b => b.status === 'PENDING' || b.status === 'CONFIRMED').length}</h3>
                                <p className="text-sm text-gray-400">Upcoming</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bookings List */}
                <div className="card-premium">
                    <h2 className="text-xl font-semibold mb-6">Your Bookings</h2>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="spinner w-8 h-8"></div>
                        </div>
                    ) : bookings.length === 0 ? (
                        <div className="text-center py-12">
                            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
                            <p className="text-gray-400 mb-6">Start by booking your first service</p>
                            <Link href="/services" className="btn-primary">
                                Browse Services
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bookings.map((booking) => (
                                <div key={booking.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                                                <Calendar className="w-6 h-6 text-primary-400" />
                                            </div>
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
                                                        {booking.provider.user.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                                                {booking.status}
                                            </span>
                                            <span className="text-primary-400 font-bold">₹{booking.totalPrice}</span>
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
