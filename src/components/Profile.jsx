import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [apiData, setApiData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedProfilePicture, setEditedProfilePicture] = useState(null);
  const [editedAddress, setEditedAddress] = useState({
    address_name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const getProfileDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/get-profile-details/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setApiData(response.data);
      setEditedFirstName(response.data.first_name);
      setEditedLastName(response.data.last_name);
      setEditedAddress(response.data.address || { address_name: "", address: "", city: "", state: "", pincode: "" });
    } catch (error) {
      console.error("Error fetching profile details:", error);
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("first_name", editedFirstName);
      formData.append("last_name", editedLastName);
      if (editedProfilePicture) {
        formData.append("profile_picture", editedProfilePicture);
      }
      formData.append("address_name", editedAddress.address_name);
      formData.append("address", editedAddress.address);
      formData.append("city", editedAddress.city);
      formData.append("state", editedAddress.state);
      formData.append("pincode", editedAddress.pincode);

      await axios.patch(`${API_URL}/api/update-profile-details/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setIsEditing(false);
      getProfileDetails();
    } catch (error) {
      console.error("Error updating profile details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  if (!apiData) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 py-8 px-4 pt-16">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-200 to-primary-200 rounded-full blur-3xl opacity-20 animate-float" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-primary-200 to-accent-200 rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />

      <div className="max-w-6xl mx-auto relative">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">My Profile</h1>
          <p className="text-neutral-600">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="glassmorphism bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-large border border-white/50 animate-fade-in-up">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={editedProfilePicture ? URL.createObjectURL(editedProfilePicture) : apiData.profile_picture || "/images/Profile.png"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-medium object-cover"
                  />
                  {isEditing && (
                    <label className="absolute bottom-2 right-2 bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-full cursor-pointer shadow-lg smooth-transition">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input
                        type="file"
                        onChange={(e) => setEditedProfilePicture(e.target.files[0])}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-neutral-800 mb-1">
                  {isEditing ? "Editing Profile" : `${apiData.first_name} ${apiData.last_name}`}
                </h2>
                <p className="text-neutral-600 mb-4">{apiData.email}</p>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold">{apiData.loyalty_points || 0}</div>
                    <div className="text-sm opacity-90">Loyalty Points</div>
                  </div>
                  <div className="bg-gradient-to-br from-accent-500 to-accent-600 text-white p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold">{new Date(apiData.date_joined).getFullYear()}</div>
                    <div className="text-sm opacity-90">Member Since</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      if (isEditing) {
                        handleSaveChanges();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl shadow-medium hover:shadow-glow-purple smooth-transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Saving...
                      </div>
                    ) : isEditing ? "Save Changes" : "Edit Profile"}
                  </button>

                  {isEditing && (
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedFirstName(apiData.first_name);
                        setEditedLastName(apiData.last_name);
                        setEditedProfilePicture(null);
                        setEditedAddress(apiData.address || { address_name: "", address: "", city: "", state: "", pincode: "" });
                      }}
                      className="w-full py-3 bg-neutral-200 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-300 smooth-transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Tabbed Interface */}
          <div className="lg:col-span-2">
            <div className="glassmorphism bg-white/70 backdrop-blur-xl rounded-3xl shadow-large border border-white/50 animate-fade-in-up">
              {/* Tab Navigation */}
              <div className="border-b border-white/20 p-6 pb-0">
                <div className="flex space-x-1 bg-neutral-100/50 p-1 rounded-xl">
                  {[
                    { id: 'profile', label: 'Profile Details', icon: '👤' },
                    { id: 'address', label: 'Address', icon: '📍' },
                    { id: 'security', label: 'Security', icon: '🔒' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium smooth-transition ${activeTab === tab.id
                        ? 'bg-white text-primary-600 shadow-medium'
                        : 'text-neutral-600 hover:text-neutral-800'
                        }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-neutral-800 mb-4">Personal Information</h3>

                    {isEditing ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">First Name</label>
                          <input
                            type="text"
                            value={editedFirstName}
                            onChange={(e) => setEditedFirstName(e.target.value)}
                            className="w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition"
                            placeholder="Enter first name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">Last Name</label>
                          <input
                            type="text"
                            value={editedLastName}
                            onChange={(e) => setEditedLastName(e.target.value)}
                            className="w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition"
                            placeholder="Enter last name"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-neutral-50/50 p-4 rounded-xl">
                          <div className="text-sm text-neutral-600 mb-1">First Name</div>
                          <div className="font-semibold text-neutral-800">{apiData.first_name}</div>
                        </div>
                        <div className="bg-neutral-50/50 p-4 rounded-xl">
                          <div className="text-sm text-neutral-600 mb-1">Last Name</div>
                          <div className="font-semibold text-neutral-800">{apiData.last_name}</div>
                        </div>
                        <div className="bg-neutral-50/50 p-4 rounded-xl">
                          <div className="text-sm text-neutral-600 mb-1">Email Address</div>
                          <div className="font-semibold text-neutral-800">{apiData.email}</div>
                        </div>
                        <div className="bg-neutral-50/50 p-4 rounded-xl">
                          <div className="text-sm text-neutral-600 mb-1">Mobile Number</div>
                          <div className="font-semibold text-neutral-800">{apiData.mobile_number}</div>
                        </div>
                        <div className="bg-neutral-50/50 p-4 rounded-xl">
                          <div className="text-sm text-neutral-600 mb-1">Member Since</div>
                          <div className="font-semibold text-neutral-800">{new Date(apiData.date_joined).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                        </div>
                        <div className="bg-neutral-50/50 p-4 rounded-xl">
                          <div className="text-sm text-neutral-600 mb-1">Account Status</div>
                          <div className="font-semibold text-green-600 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Active
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'address' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-neutral-800 mb-4">Shipping Address</h3>

                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">Address Name</label>
                          <input
                            type="text"
                            value={editedAddress.address_name}
                            onChange={(e) => setEditedAddress({ ...editedAddress, address_name: e.target.value })}
                            className="w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition"
                            placeholder="e.g., Home, Office"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">Street Address</label>
                          <textarea
                            value={editedAddress.address}
                            onChange={(e) => setEditedAddress({ ...editedAddress, address: e.target.value })}
                            className="w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition"
                            placeholder="Enter full address"
                            rows="3"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-neutral-700">City</label>
                            <input
                              type="text"
                              value={editedAddress.city}
                              onChange={(e) => setEditedAddress({ ...editedAddress, city: e.target.value })}
                              className="w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition"
                              placeholder="City"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-neutral-700">State</label>
                            <input
                              type="text"
                              value={editedAddress.state}
                              onChange={(e) => setEditedAddress({ ...editedAddress, state: e.target.value })}
                              className="w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition"
                              placeholder="State"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-neutral-700">Pincode</label>
                            <input
                              type="text"
                              value={editedAddress.pincode}
                              onChange={(e) => setEditedAddress({ ...editedAddress, pincode: e.target.value })}
                              className="w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition"
                              placeholder="Pincode"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-neutral-50/50 p-6 rounded-xl">
                        {apiData.address && apiData.address.address ? (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <h4 className="font-semibold text-neutral-800">{apiData.address.address_name}</h4>
                            </div>
                            <p className="text-neutral-600">{apiData.address.address}</p>
                            <p className="text-neutral-600">{apiData.address.city}, {apiData.address.state} - {apiData.address.pincode}</p>
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <svg className="w-12 h-12 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="text-neutral-600">No address information available</p>
                            <p className="text-neutral-500 text-sm">Click "Edit Profile" to add your address</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-neutral-800 mb-4">Security Settings</h3>

                    <div className="space-y-4">
                      <div className="bg-neutral-50/50 p-6 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-neutral-800">Password</h4>
                            <p className="text-neutral-600 text-sm">Last updated 3 months ago</p>
                          </div>
                          <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 smooth-transition">
                            Change Password
                          </button>
                        </div>
                      </div>

                      <div className="bg-neutral-50/50 p-6 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-neutral-800">Two-Factor Authentication</h4>
                            <p className="text-neutral-600 text-sm">Add an extra layer of security</p>
                          </div>
                          <button className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 smooth-transition">
                            Enable
                          </button>
                        </div>
                      </div>

                      <div className="bg-neutral-50/50 p-6 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-neutral-800">Login Sessions</h4>
                            <p className="text-neutral-600 text-sm">Manage your active sessions</p>
                          </div>
                          <button className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 smooth-transition">
                            View Sessions
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}