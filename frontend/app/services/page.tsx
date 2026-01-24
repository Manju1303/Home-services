'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Search, Filter, Star, Clock, ArrowRight } from 'lucide-react';

interface Service {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    imageUrl?: string;
}

const categoryIcons: Record<string, string> = {
    MAID: '🏠',
    COOK: '👨‍🍳',
    ELECTRICIAN: '⚡',
    PLUMBER: '🔧',
    CLEANING: '✨',
};

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['MAID', 'COOK', 'ELECTRICIAN', 'PLUMBER', 'CLEANING'];

    useEffect(() => {
        fetchServices();
    }, [selectedCategory]);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const params = selectedCategory ? `?category=${selectedCategory}` : '';
            const response = await api.get(`/services${params}`);
            setServices(response.data.services);
        } catch (error) {
            console.error('Failed to fetch services:', error);
            // Use mock data if API fails
            setServices([
                { id: 'service-maid-1', name: 'Maid Service', description: 'Professional house cleaning', category: 'MAID', basePrice: 150 },
                { id: 'service-cook-1', name: 'Cooking Service', description: 'Experienced cooks for meals', category: 'COOK', basePrice: 200 },
                { id: 'service-electrician-1', name: 'Electrician Service', description: 'Licensed electricians', category: 'ELECTRICIAN', basePrice: 300 },
                { id: 'service-plumber-1', name: 'Plumbing Service', description: 'Expert plumbers', category: 'PLUMBER', basePrice: 250 },
                { id: 'service-cleaning-1', name: 'Deep Cleaning', description: 'Comprehensive cleaning', category: 'CLEANING', basePrice: 400 },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12 animate-fadeIn">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Our <span className="gradient-text">Services</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Browse our professional home services and book instantly
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search services..."
                            className="input-field pl-12"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setSelectedCategory('')}
                            className={`px-4 py-2 rounded-lg transition-all ${selectedCategory === ''
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-white/10 hover:bg-white/20 text-gray-300'
                                }`}
                        >
                            All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${selectedCategory === cat
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-white/10 hover:bg-white/20 text-gray-300'
                                    }`}
                            >
                                <span>{categoryIcons[cat]}</span>
                                <span className="hidden sm:inline">{cat}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Services Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="spinner w-12 h-12"></div>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredServices.map((service, index) => (
                            <Link
                                key={service.id}
                                href={`/services/${service.id}`}
                                className="card-premium group cursor-pointer animate-slideUp"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Service Icon */}
                                <div className="w-16 h-16 bg-gradient-to-br from-primary-500/30 to-secondary-500/30 rounded-xl flex items-center justify-center mb-4 text-3xl group-hover:scale-110 transition-transform">
                                    {categoryIcons[service.category] || '🏠'}
                                </div>

                                {/* Service Info */}
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors">
                                    {service.name}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                    {service.description}
                                </p>

                                {/* Price & Rating */}
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-primary-400" />
                                        <span className="text-primary-400 font-bold">₹{service.basePrice}/hr</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="text-sm">4.8</span>
                                    </div>
                                </div>

                                {/* Book Now Button */}
                                <div className="mt-4 flex items-center justify-center gap-2 text-primary-400 group-hover:text-primary-300">
                                    <span>Book Now</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {filteredServices.length === 0 && !loading && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">No services found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
