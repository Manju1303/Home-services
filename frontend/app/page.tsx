import Link from 'next/link';
import { ArrowRight, CheckCircle, Star, Sparkles, Zap } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
                </div>

                <div className="container mx-auto max-w-6xl">
                    <div className="text-center animate-fadeIn">
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm">Trusted by 10,000+ Happy Customers</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slideUp">
                            Book <span className="gradient-text">Premium</span>
                            <br />
                            Home Services
                        </h1>

                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-slideUp">
                            Professional maid, cooking, electrician, plumbing, and cleaning services
                            at your doorstep. Book by the hour, pay securely.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slideUp">
                            <Link href="/services" className="btn-primary text-lg group">
                                Explore Services
                                <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/register" className="btn-outline text-lg">
                                Become a Provider
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
                        Why Choose Us?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="card-premium text-center group hover:scale-105 transition-transform duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Verified Professionals</h3>
                            <p className="text-gray-400">
                                All service providers are background-verified and highly rated by customers
                            </p>
                        </div>

                        <div className="card-premium text-center group hover:scale-105 transition-transform duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Instant Booking</h3>
                            <p className="text-gray-400">
                                Book services in minutes with flexible hourly rates and instant confirmation
                            </p>
                        </div>

                        <div className="card-premium text-center group hover:scale-105 transition-transform duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Quality Guaranteed</h3>
                            <p className="text-gray-400">
                                Rated 4.8/5 by customers. 100% satisfaction or your money back
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 px-4 bg-gradient-to-b from-transparent to-black/30">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Our <span className="gradient-text">Services</span>
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="card group cursor-pointer hover:shadow-2xl hover:shadow-primary-500/20"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="w-full h-48 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg mb-4 flex items-center justify-center">
                                    <service.icon className="w-16 h-16 text-primary-400 group-hover:scale-110 transition-transform" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                                <p className="text-gray-400 mb-4">{service.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-primary-400 font-bold">₹{service.price}/hr</span>
                                    <Link href="/services" className="text-sm text-secondary-400 hover:text-secondary-300">
                                        Book Now →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="card-premium text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Join thousands of satisfied customers who trust us for their home services
                        </p>
                        <Link href="/register" className="btn-primary text-lg">
                            Create Account - It's Free
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Service data
const services = [
    {
        name: 'Maid Service',
        description: 'Professional house cleaning and maintenance',
        price: 150,
        icon: ({ className }: { className: string }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
    },
    {
        name: 'Cooking Service',
        description: 'Experienced cooks for daily meals',
        price: 200,
        icon: ({ className }: { className: string }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
    },
    {
        name: 'Electrician',
        description: 'Licensed electricians for repairs & installations',
        price: 300,
        icon: ({ className }: { className: string }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        name: 'Plumbing',
        description: 'Expert plumbers for all plumbing needs',
        price: 250,
        icon: ({ className }: { className: string }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
    },
    {
        name: 'Deep Cleaning',
        description: 'Comprehensive cleaning for homes & offices',
        price: 400,
        icon: ({ className }: { className: string }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        ),
    },
    {
        name: 'General Services',
        description: 'Other household maintenance services',
        price: 180,
        icon: ({ className }: { className: string }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
        ),
    },
];
