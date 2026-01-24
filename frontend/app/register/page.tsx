'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { UserPlus, Mail, Lock, User, Phone, AlertCircle, Briefcase, DollarSign } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuthStore();
    const [accountType, setAccountType] = useState<'USER' | 'PROVIDER'>('USER');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: '',
        // Provider-specific fields
        specialization: '',
        hourlyRate: '',
        experience: '',
        bio: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const payload: any = {
                email: formData.email,
                password: formData.password,
                name: formData.name,
                phone: formData.phone,
                role: accountType,
            };

            // Add provider-specific fields
            if (accountType === 'PROVIDER') {
                payload.specialization = formData.specialization;
                payload.hourlyRate = parseFloat(formData.hourlyRate);
                payload.experience = parseInt(formData.experience);
                payload.bio = formData.bio;
                payload.address = formData.address;
                payload.city = formData.city;
                payload.state = formData.state;
                payload.pincode = formData.pincode;
            }

            await register(payload);

            if (accountType === 'PROVIDER') {
                router.push('/provider/dashboard');
            } else {
                router.push('/dashboard');
            }
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-2xl">
                <div className="card-premium animate-fadeIn">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <UserPlus className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                        <p className="text-gray-400">Join our home services platform</p>
                    </div>

                    {/* Account Type Selection */}
                    <div className="flex gap-4 mb-6">
                        <button
                            type="button"
                            onClick={() => setAccountType('USER')}
                            className={`flex-1 p-4 rounded-lg border-2 transition-all ${accountType === 'USER'
                                    ? 'border-primary-500 bg-primary-500/20'
                                    : 'border-white/20 bg-white/5 hover:bg-white/10'
                                }`}
                        >
                            <User className="w-6 h-6 mx-auto mb-2" />
                            <p className="font-semibold">Customer</p>
                            <p className="text-xs text-gray-400 mt-1">Book services</p>
                        </button>
                        <button
                            type="button"
                            onClick={() => setAccountType('PROVIDER')}
                            className={`flex-1 p-4 rounded-lg border-2 transition-all ${accountType === 'PROVIDER'
                                    ? 'border-secondary-500 bg-secondary-500/20'
                                    : 'border-white/20 bg-white/5 hover:bg-white/10'
                                }`}
                        >
                            <Briefcase className="w-6 h-6 mx-auto mb-2" />
                            <p className="font-semibold">Service Provider</p>
                            <p className="text-xs text-gray-400 mt-1">Offer services</p>
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start space-x-3">
                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Full Name *</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        className="input-field pl-10"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Phone</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        className="input-field pl-10"
                                        placeholder="+91 9876543210"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Email *</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="input-field pl-10"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Password *</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        className="input-field pl-10"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Confirm Password *</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        className="input-field pl-10"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Provider-Specific Fields */}
                        {accountType === 'PROVIDER' && (
                            <div className="space-y-4 pt-4 border-t border-white/10">
                                <h3 className="text-lg font-semibold text-secondary-400">Provider Information</h3>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Specialization *</label>
                                        <input
                                            type="text"
                                            required
                                            className="input-field"
                                            placeholder="e.g., Electrician, Plumbing"
                                            value={formData.specialization}
                                            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Hourly Rate (₹) *</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <DollarSign className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="number"
                                                required
                                                className="input-field pl-10"
                                                placeholder="300"
                                                value={formData.hourlyRate}
                                                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Experience (years) *</label>
                                        <input
                                            type="number"
                                            required
                                            className="input-field"
                                            placeholder="5"
                                            value={formData.experience}
                                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">City</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            placeholder="Mumbai"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Bio</label>
                                    <textarea
                                        className="input-field h-24 resize-none"
                                        placeholder="Brief description about your services and expertise"
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <div className="spinner w-5 h-5 mr-2"></div>
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5 mr-2" />
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary-400 hover:text-primary-300 font-semibold">
                            Sign in
                        </Link>
                    </div>

                    {accountType === 'PROVIDER' && (
                        <div className="mt-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-3">
                            <p className="text-xs text-yellow-400 text-center">
                                Provider accounts require admin approval before you can start accepting bookings
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
