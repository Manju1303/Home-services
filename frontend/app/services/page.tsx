'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Star, Clock, ArrowRight, Sparkles, Wrench, Zap, Users } from 'lucide-react';

const allServices = [
    {
        id: 'maid',
        name: 'House Maid',
        description: 'Professional cleaning and household management services',
        price: 150,
        category: 'Cleaning',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
        icon: Sparkles,
        color: 'from-purple-500 to-pink-500',
        rating: 4.8,
        reviews: 245,
    },
    {
        id: 'cook',
        name: 'Personal Cook',
        description: 'Experienced chefs for delicious home-cooked meals',
        price: 200,
        category: 'Cooking',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop',
        icon: Zap,
        color: 'from-orange-500 to-red-500',
        rating: 4.9,
        reviews: 189,
    },
    {
        id: 'electrician',
        name: 'Electrician',
        description: 'Licensed experts for all electrical needs',
        price: 300,
        category: 'Repair',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
        icon: Zap,
        color: 'from-yellow-500 to-orange-500',
        rating: 4.7,
        reviews: 312,
    },
    {
        id: 'plumber',
        name: 'Plumber',
        description: 'Quick fixes for pipes, leaks, and installations',
        price: 250,
        category: 'Repair',
        image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop',
        icon: Wrench,
        color: 'from-blue-500 to-cyan-500',
        rating: 4.6,
        reviews: 198,
    },
    {
        id: 'cleaning',
        name: 'Deep Cleaning',
        description: 'Thorough sanitization and deep cleaning services',
        price: 400,
        category: 'Cleaning',
        image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=300&fit=crop',
        icon: Sparkles,
        color: 'from-teal-500 to-green-500',
        rating: 4.9,
        reviews: 156,
    },
    {
        id: 'maintenance',
        name: 'Home Maintenance',
        description: 'General repairs and maintenance work',
        price: 350,
        category: 'Repair',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
        icon: Wrench,
        color: 'from-indigo-500 to-purple-500',
        rating: 4.8,
        reviews: 267,
    },
    {
        id: 'gardening',
        name: 'Gardening',
        description: 'Professional lawn care and garden maintenance',
        price: 180,
        category: 'Outdoor',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
        icon: Sparkles,
        color: 'from-green-500 to-emerald-500',
        rating: 4.7,
        reviews: 134,
    },
    {
        id: 'painting',
        name: 'Painting',
        description: 'Interior and exterior painting services',
        price: 500,
        category: 'Repair',
        image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop',
        icon: Sparkles,
        color: 'from-pink-500 to-rose-500',
        rating: 4.8,
        reviews: 178,
    },
];

const categories = ['All', 'Cleaning', 'Cooking', 'Repair', 'Outdoor'];

export default function ServicesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredServices = allServices.filter((service) => {
        const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen pt-20">
            {/* Header */}
            <section className="py-16 hero-bg">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto animate-fadeIn">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Find Your <span className="gradient-text">Perfect Service</span>
                        </h1>
                        <p className="text-slate-400 text-lg mb-8">
                            Browse our wide range of professional home services
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search services..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-field pl-12 pr-4"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slideUp">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Services Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredServices.map((service, index) => (
                            <Link
                                key={service.id}
                                href={`/services/${service.id}`}
                                className="service-card group animate-slideUp"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Image */}
                                <div className="relative h-44 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                                    {/* Category Badge */}
                                    <div className="absolute top-3 left-3 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                        <span className="text-white text-xs font-medium">{service.category}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                                            <service.icon className="w-4 h-4 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold group-hover:text-indigo-400 transition-colors">
                                            {service.name}
                                        </h3>
                                    </div>

                                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{service.description}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1 text-yellow-400">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="text-sm font-medium">{service.rating}</span>
                                            </div>
                                            <span className="text-slate-500 text-xs">({service.reviews})</span>
                                        </div>
                                        <span className="text-indigo-400 font-semibold">
                                            Rs.{service.price}/hr
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredServices.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 mx-auto mb-6 bg-slate-800/50 rounded-full flex items-center justify-center">
                                <Search className="w-10 h-10 text-slate-600" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">No services found</h3>
                            <p className="text-slate-400">Try adjusting your search or filter</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
