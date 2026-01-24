'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Clock, Star, Wrench, Sparkles, Zap, Users } from 'lucide-react';

const services = [
    {
        id: 'maid',
        name: 'House Maid',
        description: 'Professional cleaning and household management',
        price: 150,
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
        icon: Sparkles,
        color: 'from-pink-500 to-purple-500',
    },
    {
        id: 'cook',
        name: 'Personal Cook',
        description: 'Experienced chefs for delicious home-cooked meals',
        price: 200,
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop',
        icon: Zap,
        color: 'from-orange-500 to-red-500',
    },
    {
        id: 'electrician',
        name: 'Electrician',
        description: 'Licensed experts for all electrical needs',
        price: 300,
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
        icon: Zap,
        color: 'from-cyan-400 to-blue-500',
    },
    {
        id: 'plumber',
        name: 'Plumber',
        description: 'Quick fixes for pipes, leaks, and installations',
        price: 250,
        image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop',
        icon: Wrench,
        color: 'from-blue-500 to-cyan-500',
    },
    {
        id: 'cleaning',
        name: 'Deep Cleaning',
        description: 'Thorough sanitization and deep cleaning services',
        price: 400,
        image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=300&fit=crop',
        icon: Sparkles,
        color: 'from-green-400 to-cyan-500',
    },
    {
        id: 'maintenance',
        name: 'Home Maintenance',
        description: 'General repairs and maintenance work',
        price: 350,
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
        icon: Wrench,
        color: 'from-purple-500 to-pink-500',
    },
];

const features = [
    {
        icon: Shield,
        title: 'Verified Pros',
        description: 'Background verified professionals',
    },
    {
        icon: Clock,
        title: 'On-Time',
        description: 'Punctual and reliable service',
    },
    {
        icon: Star,
        title: 'Quality',
        description: 'Satisfaction guaranteed',
    },
    {
        icon: Users,
        title: 'Trusted',
        description: '10,000+ happy customers',
    },
];

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center hero-bg bg-grid-pattern overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float delay-200"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl"></div>
                </div>

                {/* Neon Lines */}
                <div className="absolute top-0 left-0 right-0 h-px neon-line"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="animate-fadeIn">
                            <span className="inline-block px-6 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6 neon-font">
                                Trusted by 10,000+ Customers
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slideUp">
                            <span className="neon-text">PREMIUM</span>
                            <br />
                            <span className="gradient-text">HOME SERVICES</span>
                        </h1>

                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto animate-slideUp delay-100">
                            Book trusted professionals for all your home service needs.
                            Quality and reliability at your doorstep.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideUp delay-200">
                            <Link href="/services" className="btn-primary flex items-center justify-center gap-2">
                                Browse Services
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link href="/register" className="btn-neon flex items-center justify-center gap-2">
                                Get Started
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 mt-16 animate-fadeIn delay-300">
                            <div className="text-center">
                                <p className="text-4xl font-bold neon-text-green neon-font">10K+</p>
                                <p className="text-gray-500 text-sm mt-1">Happy Customers</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold gradient-text neon-font">500+</p>
                                <p className="text-gray-500 text-sm mt-1">Verified Experts</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold neon-text-pink neon-font">4.9</p>
                                <p className="text-gray-500 text-sm mt-1">Average Rating</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Neon Line */}
                <div className="absolute bottom-0 left-0 right-0 h-px neon-line"></div>
            </section>

            {/* Features Section */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 neon-font">
                            WHY CHOOSE <span className="neon-text">US</span>
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            We provide the best home services with guaranteed quality
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="card text-center group animate-slideUp hover:animate-pulse-glow"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-purple-500/20 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                                    <feature.icon className="w-8 h-8 text-cyan-400" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2 neon-font text-cyan-400">{feature.title}</h3>
                                <p className="text-gray-500 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
                <div className="container mx-auto px-4 relative">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 neon-font">
                            OUR <span className="neon-text-pink">SERVICES</span>
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Professional services tailored to meet all your home needs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <Link
                                key={service.id}
                                href={`/services/${service.id}`}
                                className="service-card group animate-slideUp"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                                    {/* Price Badge */}
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/50   backdrop-blur-md rounded-full border border-cyan-500/30">
                                        <span className="text-cyan-400 font-semibold neon-font text-sm">Rs.{service.price}/hr</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                                            <service.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-xl font-semibold group-hover:text-cyan-400 transition-colors neon-font">
                                            {service.name}
                                        </h3>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-4">{service.description}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            <span className="text-sm text-gray-400">4.8</span>
                                            <span className="text-gray-600 text-sm">(120+)</span>
                                        </div>
                                        <span className="text-cyan-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all neon-font">
                                            BOOK <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/services" className="btn-neon-pink inline-flex items-center gap-2">
                            View All Services
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px neon-line"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="card-premium max-w-4xl mx-auto text-center animate-pulse-glow">
                        <h2 className="text-4xl font-bold mb-4 neon-font">
                            READY TO <span className="neon-text">START</span>?
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who trust us for their home service needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register" className="btn-primary">
                                Create Free Account
                            </Link>
                            <Link href="/services" className="btn-neon">
                                Browse Services
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px neon-line"></div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-cyan-500/10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-2xl font-bold neon-font">
                            <span className="gradient-text">HOMESERVICES</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                            2024 Home Services. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-gray-500 text-sm">
                            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
                            <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
