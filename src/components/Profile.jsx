import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
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

  const getProfileDetails = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get-profile-details/", {
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

      await axios.patch("http://127.0.0.1:8000/api/update-profile-details/", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setIsEditing(false);
      getProfileDetails();
    } catch (error) {
      console.error("Error updating profile details:", error);
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  if (!apiData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="text-center mb-6">
          <img
            src={editedProfilePicture ? URL.createObjectURL(editedProfilePicture) : apiData.profile_picture || "/"}
            alt="Profile"
            className="rounded-full w-24 h-24 mx-auto mb-4"
          />

          <p className="text-gray-600">{apiData.email}</p>
        </div>

        <div className="mb-4">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedFirstName}
                onChange={(e) => setEditedFirstName(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                placeholder="First Name"
              />
              <input
                type="text"
                value={editedLastName}
                onChange={(e) => setEditedLastName(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                placeholder="Last Name"
              />
              <input
                type="file"
                onChange={(e) => setEditedProfilePicture(e.target.files[0])}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={editedAddress.address_name}
                onChange={(e) => setEditedAddress({ ...editedAddress, address_name: e.target.value })}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                placeholder="Address Name"
              />
              <textarea
                value={editedAddress.address}
                onChange={(e) => setEditedAddress({ ...editedAddress, address: e.target.value })}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                placeholder="Address"
              />
              <input
                type="text"
                value={editedAddress.city}
                onChange={(e) => setEditedAddress({ ...editedAddress, city: e.target.value })}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                placeholder="City"
              />
              <input
                type="text"
                value={editedAddress.state}
                onChange={(e) => setEditedAddress({ ...editedAddress, state: e.target.value })}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                placeholder="State"
              />
              <input
                type="text"
                value={editedAddress.pincode}
                onChange={(e) => setEditedAddress({ ...editedAddress, pincode: e.target.value })}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                placeholder="Pincode"
              />
            </>
          ) : (
            <>
              <p className="font-medium">Mobile Number: {apiData.mobile_number}</p>
              <p className="font-medium">Date Joined: {new Date(apiData.date_joined).toLocaleDateString()}</p>
              <p className="font-medium">Loyalty Points: {apiData.loyalty_points}</p>
              <p className="font-medium">Shipping Address</p>
              <p className="text-gray-600 mb-2">{apiData.address ? `${apiData.address.address_name}, ${apiData.address.address}, ${apiData.address.city}, ${apiData.address.state}, ${apiData.address.pincode}` : "No address available"}</p>
            </>
          )}
        </div>

        <button
          onClick={() => {
            if (isEditing) {
              handleSaveChanges();
            } else {
              setIsEditing(true);
            }
          }}
          className="bg-blue-500 text-white p-2 rounded-md w-full mb-4"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
}