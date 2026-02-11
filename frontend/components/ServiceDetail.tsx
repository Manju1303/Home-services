'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Star, Clock, MapPin, Calendar, User, CheckCircle, ArrowLeft, Shield, Award } from 'lucide-react';
import Link from 'next/link';

const servicesData: Record<string, any> = {
    maid: {
        id: 'maid',
        name: 'House Maid',
        description: 'Professional cleaning and household management services. Our trained maids ensure your home stays spotless with eco-friendly cleaning products.',
        price: 150,
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop',
        rating: 4.8,
        reviews: 245,
        features: ['Daily cleaning', 'Laundry', 'Utensil cleaning', 'Dusting', 'Mopping'],
    },
    cook: {
        id: 'cook',
        name: 'Personal Cook',
        description: 'Experienced chefs for delicious home-cooked meals. From daily meals to special occasions, our cooks bring restaurant-quality food to your table.',
        price: 200,
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=400&fit=crop',
        rating: 4.9,
        reviews: 189,
        features: ['Breakfast', 'Lunch', 'Dinner', 'Special diets', 'Party catering'],
    },
    electrician: {
        id: 'electrician',
        name: 'Electrician',
        description: 'Licensed experts for all electrical needs. From wiring to appliance repairs, our certified electricians handle it all with safety and precision.',
        price: 300,
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=400&fit=crop',
        rating: 4.7,
        reviews: 312,
        features: ['Wiring', 'Fan installation', 'Light fixtures', 'Repairs', 'Safety inspection'],
    },
    plumber: {
        id: 'plumber',
        name: 'Plumber',
        description: 'Quick fixes for pipes, leaks, and installations. Our plumbers provide fast, reliable service for all your plumbing emergencies and installations.',
        price: 250,
        image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=400&fit=crop',
        rating: 4.6,
        reviews: 198,
        features: ['Leak repair', 'Pipe fitting', 'Drain cleaning', 'Toilet repair', 'Water heater'],
    },
    cleaning: {
        id: 'cleaning',
        name: 'Deep Cleaning',
        description: 'Thorough sanitization and deep cleaning services. Perfect for move-in/move-out or periodic deep cleaning of your entire home.',
        price: 400,
        image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&h=400&fit=crop',
        rating: 4.9,
        reviews: 156,
        features: ['Full home cleaning', 'Sanitization', 'Carpet cleaning', 'Kitchen deep clean', 'Bathroom deep clean'],
    },
    maintenance: {
        id: 'maintenance',
        name: 'Home Maintenance',
        description: 'General repairs and maintenance work. Our handyman services cover a wide range of home improvement and repair needs.',
        price: 350,
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=400&fit=crop',
        rating: 4.8,
        reviews: 267,
        features: ['Furniture assembly', 'Door repairs', 'Wall mounting', 'Minor repairs', 'Painting touch-ups'],
    },
};

const providers = [
    { id: '1', name: 'Rajesh Kumar', rating: 4.9, jobs: 234, experience: 5, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    { id: '2', name: 'Priya Sharma', rating: 4.8, jobs: 189, experience: 4, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { id: '3', name: 'Amit Singh', rating: 4.7, jobs: 156, experience: 3, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
];

export default function ServiceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const [selectedProvider, setSelectedProvider] = useState<string>('');
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [hours, setHours] = useState(2);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const service = servicesData[params.id as string];

    if (!service) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Service not found</h2>
                    <Link href="/services" className="btn-primary">
                        Browse Services
                    </Link>
                </div>
            </div>
        );
    }

    const totalPrice = service.price * hours;

    const handleBooking = async () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        if (!selectedProvider || !bookingDate || !bookingTime || !address) {
            alert('Please fill all required fields');
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert('Booking confirmed! Check your dashboard for details.');
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen pt-20">
            {/* Hero Image */}
            <div className="relative h-[40vh] md:h-[50vh]">
                <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>

                {/* Back Button */}
                <Link
                    href="/services"
                    className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Link>
            </div>

            <div className="container mx-auto px-4 -mt-32 relative z-10">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Service Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="card-premium animate-fadeIn">
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{service.name}</h1>
                                    <div className="flex items-center gap-4 text-slate-400">
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            <Star className="w-5 h-5 fill-current" />
                                            <span className="font-semibold">{service.rating}</span>
                                        </div>
                                        <span>({service.reviews} reviews)</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold gradient-text">Rs.{service.price}</p>
                                    <p className="text-slate-400 text-sm">per hour</p>
                                </div>
                            </div>

                            <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                {service.description}
                            </p>

                            {/* Features */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Services Included</h3>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {service.features.map((feature: string) => (
                                        <div key={feature} className="flex items-center gap-3 bg-slate-800/50 rounded-lg px-4 py-3">
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Providers */}
                        <div className="card-premium animate-fadeIn delay-100">
                            <h3 className="text-xl font-semibold mb-6">Select Service Provider</h3>
                            <div className="space-y-4">
                                {providers.map((provider) => (
                                    <div
                                        key={provider.id}
                                        onClick={() => setSelectedProvider(provider.id)}
                                        className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${selectedProvider === provider.id
                                            ? 'bg-indigo-500/20 border-2 border-indigo-500'
                                            : 'bg-slate-800/50 border-2 border-transparent hover:border-slate-600'
                                            }`}
                                    >
                                        <img
                                            src={provider.image}
                                            alt={provider.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-lg">{provider.name}</h4>
                                            <div className="flex items-center gap-4 text-sm text-slate-400">
                                                <span className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                    {provider.rating}
                                                </span>
                                                <span>{provider.jobs} jobs</span>
                                                <span>{provider.experience} yrs exp</span>
                                            </div>
                                        </div>
                                        {selectedProvider === provider.id && (
                                            <CheckCircle className="w-6 h-6 text-indigo-400" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="lg:col-span-1">
                        <div className="card-premium sticky top-24 animate-slideUp">
                            <h3 className="text-xl font-semibold mb-6">Book This Service</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Date</label>
                                    <input
                                        type="date"
                                        value={bookingDate}
                                        onChange={(e) => setBookingDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Time</label>
                                    <select
                                        value={bookingTime}
                                        onChange={(e) => setBookingTime(e.target.value)}
                                        className="input-field"
                                    >
                                        <option value="">Select time</option>
                                        <option value="08:00">08:00 AM</option>
                                        <option value="09:00">09:00 AM</option>
                                        <option value="10:00">10:00 AM</option>
                                        <option value="11:00">11:00 AM</option>
                                        <option value="12:00">12:00 PM</option>
                                        <option value="14:00">02:00 PM</option>
                                        <option value="16:00">04:00 PM</option>
                                        <option value="18:00">06:00 PM</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Duration (hours)</label>
                                    <select
                                        value={hours}
                                        onChange={(e) => setHours(Number(e.target.value))}
                                        className="input-field"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((h) => (
                                            <option key={h} value={h}>{h} hour{h > 1 ? 's' : ''}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Service Address</label>
                                    <textarea
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Enter your complete address"
                                        rows={3}
                                        className="input-field resize-none"
                                    />
                                </div>

                                {/* Price Summary */}
                                <div className="border-t border-slate-700 pt-4 mt-6">
                                    <div className="flex justify-between text-slate-400 mb-2">
                                        <span>Rs.{service.price} x {hours} hrs</span>
                                        <span>Rs.{totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Total</span>
                                        <span className="gradient-text">Rs.{totalPrice}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleBooking}
                                    disabled={loading}
                                    className="btn-primary w-full flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="spinner w-5 h-5"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>Confirm Booking</>
                                    )}
                                </button>

                                {/* Trust Badges */}
                                <div className="flex items-center justify-center gap-6 pt-4 text-slate-500 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Shield className="w-4 h-4" />
                                        <span>Secure</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Award className="w-4 h-4" />
                                        <span>Verified</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Spacer */}
            <div className="h-24"></div>
        </div>
    );
}
