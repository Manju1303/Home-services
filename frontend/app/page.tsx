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
                {/* Animated Background Orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float delay-200"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-3xl"></div>
                </div>

                {/* Animated Neon Lines */}
                <div className="absolute top-0 left-0 right-0 h-px neon-line"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-5xl mx-auto">
                        {/* Badge */}
                        <div className="animate-fadeInDown">
                            <span className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full text-sm mb-8 font-rajdhani tracking-wider">
                                <span className="gradient-text font-semibold">TRUSTED BY 10,000+ CUSTOMERS</span>
                            </span>
                        </div>

                        {/* Main Heading - Multiple Fonts */}
                        <h1 className="mb-8 animate-fadeInUp">
                            <span className="block text-6xl md:text-8xl font-orbitron font-bold mb-4">
                                <span className="gradient-text">PREMIUM</span>
                            </span>
                            <span className="block text-5xl md:text-7xl font-rajdhani font-bold">
                                <span className="gradient-text-alt">HOME SERVICES</span>
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto animate-fadeInUp delay-200 font-exo">
                            Book trusted professionals for all your home needs.
                            <span className="block mt-2 color-shift-text font-semibold">Quality at your doorstep.</span>
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fadeInUp delay-300">
                            <Link href="/services" className="btn-gradient flex items-center justify-center gap-3">
                                <span>Browse Services</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link href="/register" className="btn-dual-border flex items-center justify-center gap-3">
                                Get Started Free
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 mt-20 animate-fadeInUp delay-400">
                            <div className="text-center">
                                <p className="text-4xl md:text-5xl font-orbitron font-bold gradient-text">10K+</p>
                                <p className="text-gray-500 text-sm mt-2 font-rajdhani tracking-wide">HAPPY CUSTOMERS</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl md:text-5xl font-rajdhani font-bold gradient-text-alt">500+</p>
                                <p className="text-gray-500 text-sm mt-2 font-rajdhani tracking-wide">VERIFIED EXPERTS</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl md:text-5xl font-exo font-bold gradient-text-warm">4.9</p>
                                <p className="text-gray-500 text-sm mt-2 font-rajdhani tracking-wide">AVERAGE RATING</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Neon Line */}
                <div className="absolute bottom-0 left-0 right-0 h-px neon-line"></div>
            </section>

            {/* Features Section */}
            <section className="py-28 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="font-orbitron">WHY CHOOSE </span>
                            <span className="gradient-text font-rajdhani">US</span>
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto font-exo">
                            We provide the best home services with guaranteed quality
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="card text-center group animate-fadeInUp"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-purple-500/20 group-hover:from-cyan-500/30 group-hover:to-pink-500/30 transition-all duration-500">
                                    <feature.icon className="w-8 h-8 text-cyan-400 group-hover:text-pink-400 transition-colors duration-500" />
                                </div>
                                <h3 className="text-xl font-rajdhani font-bold mb-2 gradient-text">{feature.title}</h3>
                                <p className="text-gray-500 text-sm font-exo">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-28 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
                <div className="container mx-auto px-4 relative">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="font-rajdhani">OUR </span>
                            <span className="gradient-text-alt font-orbitron">SERVICES</span>
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto font-exo">
                            Professional services tailored to meet all your home needs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <Link
                                key={service.id}
                                href={`/services/${service.id}`}
                                className="service-card group animate-fadeInUp"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                                    {/* Price Badge */}
                                    <div className="absolute top-4 right-4 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-cyan-500/30">
                                        <span className="gradient-text font-rajdhani font-bold text-sm">Rs.{service.price}/hr</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg`}>
                                            <service.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-xl font-rajdhani font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-500">
                                            {service.name}
                                        </h3>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-4 font-exo">{service.description}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            <span className="text-sm text-gray-400 font-exo">4.8</span>
                                            <span className="text-gray-600 text-sm">(120+)</span>
                                        </div>
                                        <span className="gradient-text text-sm font-rajdhani font-bold flex items-center gap-1 group-hover:gap-3 transition-all duration-500">
                                            BOOK NOW <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <Link href="/services" className="btn-neon inline-flex items-center gap-3">
                            View All Services
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-28 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px neon-line"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="card-premium max-w-4xl mx-auto text-center animate-pulse-glow">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="font-rajdhani">READY TO </span>
                            <span className="glow-text font-orbitron">START</span>
                            <span className="font-rajdhani">?</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto font-exo">
                            Join thousands of satisfied customers who trust us for their home service needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Link href="/register" className="btn-gradient">
                                <span>Create Free Account</span>
                            </Link>
                            <Link href="/services" className="btn-dual-border">
                                Browse Services
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px neon-line"></div>
            </section>

            {/* Footer */}
            <footer className="py-16 border-t border-cyan-500/10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-2xl font-orbitron font-bold">
                            <span className="gradient-text">HOMESERVICES</span>
                        </div>
                        <p className="text-gray-600 text-sm font-exo">
                            2024 Home Services. All rights reserved.
                        </p>
                        <div className="flex gap-8 text-gray-500 text-sm font-rajdhani tracking-wide">
                            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">PRIVACY</a>
                            <a href="#" className="hover:text-pink-400 transition-colors duration-300">TERMS</a>
                            <a href="#" className="hover:text-purple-400 transition-colors duration-300">CONTACT</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
