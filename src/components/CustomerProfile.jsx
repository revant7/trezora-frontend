import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthenticationContext } from '../context/AuthenticationContext';

export default function CustomerProfile() {
    const { isAuthenticated } = useContext(AuthenticationContext);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const API_URL = process.env.REACT_APP_API_URL;

    const [profileData, setProfileData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        mobile_number: '',
        address: {
            address: '',
            address_name: '',
            city: '',
            state: '',
            pincode: ''
        }
    });

    const [originalData, setOriginalData] = useState({});

    useEffect(() => {
        if (isAuthenticated) {
            fetchProfileData();
        }
    }, [isAuthenticated]);

    const fetchProfileData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/get-profile-details/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            setProfileData(response.data);
            setOriginalData(response.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
            setError('Failed to load profile data');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        if (isEditing) {
            // Cancel editing - restore original data
            setProfileData(originalData);
            setError('');
            setSuccess('');
        }
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setError('');
            setSuccess('');

            const updateData = {
                first_name: profileData.first_name,
                last_name: profileData.last_name,
                email: profileData.email,
                mobile_number: profileData.mobile_number,
                address: profileData.address
            };

            const response = await axios.patch(`${API_URL}/api/update-profile/`, updateData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                setOriginalData(profileData);
                setIsEditing(false);
                setSuccess('Profile updated successfully!');
                setTimeout(() => setSuccess(''), 5000);
            } else {
                setError(response.data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setError(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleInputChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddressChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            address: {
                ...prev.address,
                [field]: value
            }
        }));
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4 py-8 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-neutral-700 mb-4">Please sign in to view your profile</h2>
                    <a href="/sign-in" className="text-primary-600 hover:text-primary-700 font-medium">
                        Go to Sign In →
                    </a>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4 py-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full mx-auto mb-4"></div>
                    <p className="text-lg text-neutral-600">Loading your profile...</p>
                </div>
            </div>
        );
    }

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

                {/* Success/Error Messages */}
                {success && (
                    <div className="mb-6 p-4 bg-success-50 border border-success-200 text-success-700 rounded-xl">
                        {success}
                    </div>
                )}
                {error && (
                    <div className="mb-6 p-4 bg-error-50 border border-error-200 text-error-700 rounded-xl">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Profile Avatar & Summary */}
                    <div className="lg:col-span-1">
                        <div className="glassmorphism bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-medium">

                            {/* Avatar */}
                            <div className="text-center mb-6">
                                <div className="relative inline-block">
                                    <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-glow-purple">
                                        {profileData.first_name && profileData.last_name
                                            ? `${profileData.first_name[0]}${profileData.last_name[0]}`
                                            : 'U'}
                                    </div>
                                    <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full border-2 border-primary-500 flex items-center justify-center text-primary-500 hover:bg-primary-50 smooth-transition">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </button>
                                </div>
                                <h2 className="text-xl font-bold text-neutral-800 mt-4">
                                    {profileData.first_name} {profileData.last_name}
                                </h2>
                                <p className="text-neutral-600">Customer since 2024</p>
                            </div>

                            {/* Quick Stats */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl">
                                    <span className="text-neutral-600">Total Orders</span>
                                    <span className="font-bold text-primary-600">--</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-accent-50 to-success-50 rounded-xl">
                                    <span className="text-neutral-600">Wishlist Items</span>
                                    <span className="font-bold text-accent-600">--</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-success-50 to-primary-50 rounded-xl">
                                    <span className="text-neutral-600">Loyalty Points</span>
                                    <span className="font-bold text-success-600">--</span>
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

                                {/* First Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-700">First Name</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={profileData.first_name}
                                            disabled={!isEditing}
                                            onChange={(e) => handleInputChange('first_name', e.target.value)}
                                            className={`w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl outline-none smooth-transition text-neutral-700 ${isEditing ? 'focus:ring-2 focus:ring-primary-400 focus:border-primary-400' : 'cursor-not-allowed'
                                                }`}
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                    </div>
                                </div>

                                {/* Last Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-700">Last Name</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={profileData.last_name}
                                            disabled={!isEditing}
                                            onChange={(e) => handleInputChange('last_name', e.target.value)}
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
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className={`w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl outline-none smooth-transition text-neutral-700 ${isEditing ? 'focus:ring-2 focus:ring-primary-400 focus:border-primary-400' : 'cursor-not-allowed'
                                                }`}
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                    </div>
                                </div>

                                {/* Mobile Number */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-700">Mobile Number</label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            value={profileData.mobile_number}
                                            disabled={!isEditing}
                                            onChange={(e) => handleInputChange('mobile_number', e.target.value)}
                                            className={`w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl outline-none smooth-transition text-neutral-700 ${isEditing ? 'focus:ring-2 focus:ring-primary-400 focus:border-primary-400' : 'cursor-not-allowed'
                                                }`}
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                    </div>
                                </div>

                                {/* Address Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-700">Address Name</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={profileData.address?.address_name || ''}
                                            disabled={!isEditing}
                                            onChange={(e) => handleAddressChange('address_name', e.target.value)}
                                            placeholder="e.g. Home, Office"
                                            className={`w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl outline-none smooth-transition text-neutral-700 ${isEditing ? 'focus:ring-2 focus:ring-primary-400 focus:border-primary-400' : 'cursor-not-allowed'
                                                }`}
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-700">Street Address</label>
                                    <div className="relative">
                                        <textarea
                                            value={profileData.address?.address || ''}
                                            disabled={!isEditing}
                                            onChange={(e) => handleAddressChange('address', e.target.value)}
                                            rows="3"
                                            className={`w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl outline-none smooth-transition text-neutral-700 resize-none ${isEditing ? 'focus:ring-2 focus:ring-primary-400 focus:border-primary-400' : 'cursor-not-allowed'
                                                }`}
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                    </div>
                                </div>

                                {/* City and State */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-neutral-700">City</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={profileData.address?.city || ''}
                                                disabled={!isEditing}
                                                onChange={(e) => handleAddressChange('city', e.target.value)}
                                                className={`w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl outline-none smooth-transition text-neutral-700 ${isEditing ? 'focus:ring-2 focus:ring-primary-400 focus:border-primary-400' : 'cursor-not-allowed'
                                                    }`}
                                            />
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-neutral-700">State</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={profileData.address?.state || ''}
                                                disabled={!isEditing}
                                                onChange={(e) => handleAddressChange('state', e.target.value)}
                                                className={`w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl outline-none smooth-transition text-neutral-700 ${isEditing ? 'focus:ring-2 focus:ring-primary-400 focus:border-primary-400' : 'cursor-not-allowed'
                                                    }`}
                                            />
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* PIN Code */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-700">PIN Code</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={profileData.address?.pincode || ''}
                                            disabled={!isEditing}
                                            onChange={(e) => handleAddressChange('pincode', e.target.value)}
                                            className={`w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl outline-none smooth-transition text-neutral-700 ${isEditing ? 'focus:ring-2 focus:ring-primary-400 focus:border-primary-400' : 'cursor-not-allowed'
                                                }`}
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                    </div>
                                </div>

                                {/* Save/Cancel Buttons */}
                                {isEditing && (
                                    <div className="flex gap-4 pt-4">
                                        <button
                                            onClick={handleSave}
                                            disabled={saving}
                                            className={`flex-1 py-3 font-semibold rounded-xl shadow-medium smooth-transition hover:scale-[1.02] active:scale-[0.98] ${saving
                                                    ? 'bg-neutral-400 text-neutral-600 cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-success-500 to-primary-500 text-white hover:shadow-glow-green'
                                                }`}
                                        >
                                            {saving ? 'Saving...' : 'Save Changes'}
                                        </button>
                                        <button
                                            onClick={handleEdit}
                                            disabled={saving}
                                            className="px-6 py-3 bg-neutral-200 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-300 smooth-transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
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
