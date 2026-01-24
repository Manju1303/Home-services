'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { ArrowLeft, Clock, Star, Calendar, MapPin, User, CheckCircle } from 'lucide-react';

interface Service {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
}

interface Provider {
    id: string;
    specialization: string;
    hourlyRate: number;
    rating: number;
    totalReviews: number;
    experience: number;
    user: {
        name: string;
        phone: string;
    };
}

const categoryIcons: Record<string, string> = {
    MAID: '🏠',
    COOK: '👨‍🍳',
    ELECTRICIAN: '⚡',
    PLUMBER: '🔧',
    CLEANING: '✨',
};

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const [service, setService] = useState<Service | null>(null);
    const [providers, setProviders] = useState<Provider[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProvider, setSelectedProvider] = useState<string>('');
    const [bookingData, setBookingData] = useState({
        date: '',
        time: '10:00',
        hours: 2,
        address: '',
        notes: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchServiceDetails();
        fetchProviders();
    }, [params.id]);

    const fetchServiceDetails = async () => {
        try {
            const response = await api.get(`/services/${params.id}`);
            setService(response.data.service);
        } catch (error) {
            console.error('Failed to fetch service:', error);
            // Mock data for demo
            setService({
                id: params.id,
                name: 'Home Service',
                description: 'Professional home service on hourly basis',
                category: 'MAID',
                basePrice: 200,
            });
        }
    };

    const fetchProviders = async () => {
        try {
            const response = await api.get('/providers');
            setProviders(response.data.providers);
        } catch (error) {
            console.error('Failed to fetch providers:', error);
            // Mock providers
            setProviders([
                {
                    id: 'provider-1',
                    specialization: 'All Services',
                    hourlyRate: 200,
                    rating: 4.8,
                    totalReviews: 42,
                    experience: 5,
                    user: { name: 'Priya Sharma', phone: '+91 9876543211' },
                },
                {
                    id: 'provider-2',
                    specialization: 'Electrician, Plumbing',
                    hourlyRate: 300,
                    rating: 4.5,
                    totalReviews: 24,
                    experience: 8,
                    user: { name: 'Rajesh Kumar', phone: '+91 9876543210' },
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = () => {
        const provider = providers.find(p => p.id === selectedProvider);
        const rate = provider?.hourlyRate || service?.basePrice || 200;
        return rate * bookingData.hours;
    };

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        if (!selectedProvider) {
            alert('Please select a provider');
            return;
        }

        setSubmitting(true);

        try {
            await api.post('/bookings', {
                serviceId: params.id,
                providerId: selectedProvider,
                bookingDate: bookingData.date,
                startTime: bookingData.time,
                hours: bookingData.hours,
                address: bookingData.address,
                notes: bookingData.notes,
            });
            setSuccess(true);
            setTimeout(() => {
                router.push('/dashboard');
            }, 2000);
        } catch (error: any) {
            console.error('Booking failed:', error);
            alert(error.response?.data?.error || 'Booking failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="spinner w-12 h-12"></div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="card-premium text-center animate-fadeIn">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Booking Successful!</h2>
                    <p className="text-gray-400">Redirecting to dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Back Button */}
                <Link href="/services" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Services
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Service Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Service Header */}
                        <div className="card-premium animate-fadeIn">
                            <div className="flex items-start gap-4">
                                <div className="w-20 h-20 bg-gradient-to-br from-primary-500/30 to-secondary-500/30 rounded-xl flex items-center justify-center text-4xl">
                                    {categoryIcons[service?.category || 'MAID']}
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold mb-2">{service?.name}</h1>
                                    <p className="text-gray-400 mb-4">{service?.description}</p>
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-2 text-primary-400">
                                            <Clock className="w-5 h-5" />
                                            <span className="font-bold">₹{service?.basePrice}/hr</span>
                                        </span>
                                        <span className="flex items-center gap-1 text-yellow-400">
                                            <Star className="w-5 h-5 fill-current" />
                                            <span>4.8 (100+ reviews)</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Select Provider */}
                        <div className="card animate-slideUp">
                            <h2 className="text-xl font-semibold mb-4">Select a Provider</h2>
                            <div className="space-y-4">
                                {providers.map((provider) => (
                                    <div
                                        key={provider.id}
                                        onClick={() => setSelectedProvider(provider.id)}
                                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedProvider === provider.id
                                                ? 'border-primary-500 bg-primary-500/10'
                                                : 'border-white/20 hover:border-white/40'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                                                    <User className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{provider.user.name}</h3>
                                                    <p className="text-sm text-gray-400">{provider.specialization}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-primary-400 font-bold">₹{provider.hourlyRate}/hr</p>
                                                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                                    <Star className="w-3 h-3 fill-current" />
                                                    <span>{provider.rating} ({provider.totalReviews})</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">{provider.experience} years experience</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="lg:col-span-1">
                        <div className="card-premium sticky top-24 animate-slideUp">
                            <h2 className="text-xl font-semibold mb-6">Book This Service</h2>

                            <form onSubmit={handleBooking} className="space-y-4">
                                {/* Date */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        <Calendar className="w-4 h-4 inline mr-2" />
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        className="input-field"
                                        min={new Date().toISOString().split('T')[0]}
                                        value={bookingData.date}
                                        onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                                    />
                                </div>

                                {/* Time */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        <Clock className="w-4 h-4 inline mr-2" />
                                        Start Time
                                    </label>
                                    <select
                                        className="input-field"
                                        value={bookingData.time}
                                        onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                                    >
                                        {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => (
                                            <option key={hour} value={`${hour}:00`}>
                                                {hour}:00 {hour < 12 ? 'AM' : 'PM'}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Hours */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Hours Required</label>
                                    <div className="flex items-center gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setBookingData({ ...bookingData, hours: Math.max(1, bookingData.hours - 1) })}
                                            className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
                                        >
                                            -
                                        </button>
                                        <span className="text-2xl font-bold w-12 text-center">{bookingData.hours}</span>
                                        <button
                                            type="button"
                                            onClick={() => setBookingData({ ...bookingData, hours: Math.min(12, bookingData.hours + 1) })}
                                            className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        <MapPin className="w-4 h-4 inline mr-2" />
                                        Service Address
                                    </label>
                                    <textarea
                                        required
                                        rows={2}
                                        className="input-field resize-none"
                                        placeholder="Enter your complete address"
                                        value={bookingData.address}
                                        onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                                    />
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Special Instructions</label>
                                    <textarea
                                        rows={2}
                                        className="input-field resize-none"
                                        placeholder="Any special requirements?"
                                        value={bookingData.notes}
                                        onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                                    />
                                </div>

                                {/* Price Summary */}
                                <div className="border-t border-white/10 pt-4 mt-4">
                                    <div className="flex justify-between items-center text-lg">
                                        <span>Total Amount:</span>
                                        <span className="text-2xl font-bold text-primary-400">₹{calculateTotal()}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {bookingData.hours} hours × ₹{calculateTotal() / bookingData.hours}/hr
                                    </p>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={submitting || !selectedProvider}
                                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? (
                                        <>
                                            <div className="spinner w-5 h-5 mr-2 inline-block"></div>
                                            Booking...
                                        </>
                                    ) : isAuthenticated ? (
                                        'Confirm Booking'
                                    ) : (
                                        'Login to Book'
                                    )}
                                </button>

                                {!isAuthenticated && (
                                    <p className="text-xs text-center text-gray-400">
                                        <Link href="/login" className="text-primary-400 hover:underline">Login</Link> or{' '}
                                        <Link href="/register" className="text-primary-400 hover:underline">Register</Link> to book
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
