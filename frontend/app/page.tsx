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
        color: 'from-purple-500 to-pink-500',
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
        color: 'from-yellow-500 to-orange-500',
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
        color: 'from-teal-500 to-green-500',
    },
    {
        id: 'maintenance',
        name: 'Home Maintenance',
        description: 'General repairs and maintenance work',
        price: 350,
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
        icon: Wrench,
        color: 'from-indigo-500 to-purple-500',
    },
];

const features = [
    {
        icon: Shield,
        title: 'Verified Professionals',
        description: 'All service providers undergo thorough background verification',
    },
    {
        icon: Clock,
        title: 'On-Time Service',
        description: 'Punctual professionals who value your time',
    },
    {
        icon: Star,
        title: 'Quality Guaranteed',
        description: 'Satisfaction guaranteed or your money back',
    },
    {
        icon: Users,
        title: 'Trusted by Thousands',
        description: 'Join 10,000+ happy customers across the city',
    },
];

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center hero-bg bg-grid-pattern overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float delay-200"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="animate-fadeIn">
                            <span className="inline-block px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-sm font-medium mb-6">
                                Trusted by 10,000+ Customers
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slideUp">
                            Premium <span className="gradient-text">Home Services</span>
                            <br />
                            <span className="text-4xl md:text-5xl text-slate-300">At Your Doorstep</span>
                        </h1>

                        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto animate-slideUp delay-100">
                            Book trusted professionals for all your home service needs.
                            From cleaning to repairs, we have got you covered with quality and reliability.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideUp delay-200">
                            <Link href="/services" className="btn-primary flex items-center justify-center gap-2">
                                Browse Services
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link href="/register" className="btn-outline flex items-center justify-center gap-2">
                                Get Started Free
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 mt-16 animate-fadeIn delay-300">
                            <div className="text-center">
                                <p className="text-4xl font-bold gradient-text">10K+</p>
                                <p className="text-slate-400 text-sm mt-1">Happy Customers</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold gradient-text-cyan">500+</p>
                                <p className="text-slate-400 text-sm mt-1">Verified Experts</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold gradient-text">4.9</p>
                                <p className="text-slate-400 text-sm mt-1">Average Rating</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-3 bg-indigo-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">
                            Why Choose <span className="gradient-text">Us</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            We provide the best home services with guaranteed quality and professionalism
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="card text-center group animate-slideUp"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-8 h-8 text-indigo-400" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-slate-400 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24 relative bg-slate-900/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">
                            Our <span className="gradient-text">Services</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
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
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                                    {/* Price Badge */}
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                        <span className="text-white font-semibold">From Rs.{service.price}/hr</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                                            <service.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-xl font-semibold group-hover:text-indigo-400 transition-colors">
                                            {service.name}
                                        </h3>
                                    </div>
                                    <p className="text-slate-400 text-sm mb-4">{service.description}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span className="text-sm">4.8</span>
                                            <span className="text-slate-500 text-sm">(120+)</span>
                                        </div>
                                        <span className="text-indigo-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Book Now <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/services" className="btn-primary inline-flex items-center gap-2">
                            View All Services
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="card-premium max-w-4xl mx-auto text-center glow-indigo">
                        <h2 className="text-4xl font-bold mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who trust us for their home service needs.
                            Book your first service today!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register" className="btn-primary">
                                Create Free Account
                            </Link>
                            <Link href="/services" className="btn-outline">
                                Browse Services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-800">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-2xl font-bold gradient-text">HomeServices</div>
                        <p className="text-slate-500 text-sm">
                            2024 Home Services. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-slate-400 text-sm">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
