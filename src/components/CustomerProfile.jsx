import React, { useState } from 'react';

export default function CustomerProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main Street, City, State 12345',
        birthdate: '1995-06-15'
    });

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setIsEditing(false);
        // Handle save logic here
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4 py-8">
            {/* Background decorative elements */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-accent-200 to-primary-200 rounded-full blur-3xl opacity-20 animate-float" />
            <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-primary-200 to-accent-200 rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />

            <div className="relative max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold gradient-text mb-4">My Profile</h1>
                    <p className="text-lg text-neutral-600">
                        Manage your account settings and personal information
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Profile Avatar & Summary */}
                    <div className="lg:col-span-1">
                        <div className="glassmorphism bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-medium">

                            {/* Avatar */}
                            <div className="text-center mb-6">
                                <div className="relative inline-block">
                                    <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-glow-purple">
                                        {profileData.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full border-2 border-primary-500 flex items-center justify-center text-primary-500 hover:bg-primary-50 smooth-transition">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </button>
                                </div>
                                <h2 className="text-xl font-bold text-neutral-800 mt-4">{profileData.name}</h2>
                                <p className="text-neutral-600">Customer since 2023</p>
                            </div>

                            {/* Quick Stats */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl">
                                    <span className="text-neutral-600">Total Orders</span>
                                    <span className="font-bold text-primary-600">24</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-accent-50 to-success-50 rounded-xl">
                                    <span className="text-neutral-600">Wishlist Items</span>
                                    <span className="font-bold text-accent-600">12</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-success-50 to-primary-50 rounded-xl">
                                    <span className="text-neutral-600">Loyalty Points</span>
                                    <span className="font-bold text-success-600">1,250</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="lg:col-span-2">
                        <div className="glassmorphism bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-white/50 shadow-medium">

                            {/* Header with Edit Button */}
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold text-neutral-800">Personal Information</h3>
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium rounded-xl hover:shadow-glow-purple smooth-transition hover:scale-105 active:scale-95"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    {isEditing ? 'Cancel' : 'Edit Profile'}
                                </button>
                            </div>

                            {/* Profile Form */}
                            <div className="space-y-6">

                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-700">Full Name</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={profileData.name}
                                            disabled={!isEditing}
                                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                            className={`w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl outline-none smooth-transition text-neutral-700 ${isEditing ? 'focus:ring-2 focus:ring-primary-400 focus:border-primary-400' : 'cursor-not-allowed'
                                                }`}
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-700">Email Address</label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={profileData.email}
                                            disabled={!isEditing}
                                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                            className={`w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl outline-none smooth-transition text-neutral-700 ${isEditing ? 'focus:ring-2 focus:ring-primary-400 focus:border-primary-400' : 'cursor-not-allowed'
                                                }`}
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-700">Phone Number</label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            value={profileData.phone}
                                            disabled={!isEditing}
                                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                            className={`w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl outline-none smooth-transition text-neutral-700 ${isEditing ? 'focus:ring-2 focus:ring-primary-400 focus:border-primary-400' : 'cursor-not-allowed'
                                                }`}
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-700">Address</label>
                                    <div className="relative">
                                        <textarea
                                            value={profileData.address}
                                            disabled={!isEditing}
                                            onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                            rows="3"
                                            className={`w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl outline-none smooth-transition text-neutral-700 resize-none ${isEditing ? 'focus:ring-2 focus:ring-primary-400 focus:border-primary-400' : 'cursor-not-allowed'
                                                }`}
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                    </div>
                                </div>

                                {/* Birth Date */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-700">Birth Date</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={profileData.birthdate}
                                            disabled={!isEditing}
                                            onChange={(e) => setProfileData({ ...profileData, birthdate: e.target.value })}
                                            className={`w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl outline-none smooth-transition text-neutral-700 ${isEditing ? 'focus:ring-2 focus:ring-primary-400 focus:border-primary-400' : 'cursor-not-allowed'
                                                }`}
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                    </div>
                                </div>

                                {/* Save Button */}
                                {isEditing && (
                                    <div className="flex gap-4 pt-4">
                                        <button
                                            onClick={handleSave}
                                            className="flex-1 py-3 bg-gradient-to-r from-success-500 to-primary-500 text-white font-semibold rounded-xl shadow-medium hover:shadow-glow-green smooth-transition hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="px-6 py-3 bg-neutral-200 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-300 smooth-transition hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Settings */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Security Settings */}
                    <div className="glassmorphism bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-medium">
                        <h4 className="text-lg font-bold text-neutral-800 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Security
                        </h4>
                        <div className="space-y-3">
                            <button className="w-full text-left p-3 hover:bg-primary-50 rounded-xl smooth-transition flex items-center justify-between">
                                <span className="text-neutral-700">Change Password</span>
                                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button className="w-full text-left p-3 hover:bg-primary-50 rounded-xl smooth-transition flex items-center justify-between">
                                <span className="text-neutral-700">Two-Factor Authentication</span>
                                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="glassmorphism bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-medium">
                        <h4 className="text-lg font-bold text-neutral-800 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Preferences
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 hover:bg-accent-50 rounded-xl smooth-transition">
                                <span className="text-neutral-700">Email Notifications</span>
                                <button className="w-12 h-6 bg-primary-500 rounded-full relative smooth-transition">
                                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 smooth-transition" />
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-3 hover:bg-accent-50 rounded-xl smooth-transition">
                                <span className="text-neutral-700">SMS Notifications</span>
                                <button className="w-12 h-6 bg-neutral-300 rounded-full relative smooth-transition">
                                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 smooth-transition" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
