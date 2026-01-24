'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Users, Briefcase, Calendar, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Analytics {
    totalUsers: number;
    totalProviders: number;
    approvedProviders: number;
    pendingProviders: number;
    totalBookings: number;
    completedBookings: number;
    totalRevenue: number;
}

interface Provider {
    id: string;
    specialization: string;
    hourlyRate: number;
    experience: number;
    isApproved: boolean;
    user: {
        name: string;
        email: string;
        phone: string;
    };
}

export default function AdminDashboard() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuthStore();
    const [analytics, setAnalytics] = useState<Analytics | null>(null);
    const [pendingProviders, setPendingProviders] = useState<Provider[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'ADMIN') {
            router.push('/login');
            return;
        }
        fetchData();
    }, [isAuthenticated, user]);

    const fetchData = async () => {
        try {
            const [analyticsRes, providersRes] = await Promise.all([
                api.get('/admin/analytics'),
                api.get('/admin/providers/pending'),
            ]);
            setAnalytics(analyticsRes.data.summary);
            setPendingProviders(providersRes.data.providers);
        } catch (error) {
            console.error('Failed to fetch admin data:', error);
            // Mock data
            setAnalytics({
                totalUsers: 25,
                totalProviders: 8,
                approvedProviders: 5,
                pendingProviders: 3,
                totalBookings: 42,
                completedBookings: 30,
                totalRevenue: 25000,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleApproval = async (providerId: string, approve: boolean) => {
        try {
            await api.put(`/admin/providers/${providerId}/approve`, { isApproved: approve });
            fetchData();
        } catch (error) {
            console.error('Failed to update provider:', error);
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
                        Admin <span className="gradient-text">Dashboard</span>
                    </h1>
                    <p className="text-gray-400">Platform management and analytics</p>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="card-premium">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{analytics?.totalUsers}</p>
                                <p className="text-sm text-gray-400">Total Users</p>
                            </div>
                        </div>
                    </div>

                    <div className="card-premium">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <Briefcase className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{analytics?.approvedProviders}</p>
                                <p className="text-sm text-gray-400">Active Providers</p>
                            </div>
                        </div>
                    </div>

                    <div className="card-premium">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{analytics?.totalBookings}</p>
                                <p className="text-sm text-gray-400">Total Bookings</p>
                            </div>
                        </div>
                    </div>

                    <div className="card-premium">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-primary-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">₹{analytics?.totalRevenue}</p>
                                <p className="text-sm text-gray-400">Total Revenue</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pending Approvals */}
                <div className="card-premium mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">Pending Provider Approvals</h2>
                        <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                            {pendingProviders.length} pending
                        </span>
                    </div>

                    {pendingProviders.length === 0 ? (
                        <div className="text-center py-8">
                            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                            <p className="text-gray-400">No pending approvals</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pendingProviders.map((provider) => (
                                <div key={provider.id} className="bg-white/5 rounded-lg p-4">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="font-semibold">{provider.user.name}</h3>
                                            <p className="text-sm text-gray-400">{provider.user.email}</p>
                                            <div className="flex flex-wrap gap-3 text-sm mt-2">
                                                <span className="bg-primary-500/20 text-primary-400 px-2 py-1 rounded">
                                                    {provider.specialization}
                                                </span>
                                                <span className="bg-white/10 text-gray-300 px-2 py-1 rounded">
                                                    ₹{provider.hourlyRate}/hr
                                                </span>
                                                <span className="bg-white/10 text-gray-300 px-2 py-1 rounded">
                                                    {provider.experience} yrs exp
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleApproval(provider.id, true)}
                                                className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-lg transition-colors"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleApproval(provider.id, false)}
                                                className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-colors"
                                            >
                                                <XCircle className="w-4 h-4" />
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="card">
                        <h3 className="font-semibold mb-4">Booking Status</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Completed</span>
                                <span className="font-bold text-green-400">{analytics?.completedBookings}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Pending</span>
                                <span className="font-bold text-yellow-400">
                                    {(analytics?.totalBookings || 0) - (analytics?.completedBookings || 0)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h3 className="font-semibold mb-4">Provider Status</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Approved</span>
                                <span className="font-bold text-green-400">{analytics?.approvedProviders}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Pending Approval</span>
                                <span className="font-bold text-yellow-400">{analytics?.pendingProviders}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
