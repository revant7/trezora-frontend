import React, { useState } from "react";
function Profile() {

  const [name, setName] = useState("yash joshi");
  const [email, setemail] = useState("yeshjoshi006@gmail.com");
  const [sippingaddress, setshippingaddress] = useState("a-21 block 18 rajouri garden");
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isEditing, setIsEditing] = useState(false);
  const orders = [
    { id: 1, date: '2025-01-01', status: 'Shipped', total: '$100.00' },
    { id: 2, date: '2025-02-15', status: 'Delivered', total: '$50.00' },
    { id: 3, date: '2025-02-20', status: 'Processing', total: '$75.00' }
  ];
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="text-center mb-6">
          <img
            src={"/"}
            alt="Profile"
            className="rounded-full w-24 h-24 mx-auto mb-4"
          />
          <h1 className="text-2xl font-semibold text-gray-800">{name}</h1>
          <p className="text-gray-600">{email}</p>
        </div>

        {/* Edit Profile Section */}
        <div className="mb-4">
          {isEditing ? (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => console.log(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                placeholder="Name"
              />
              <input
                type="email"
                value={email}
                onChange={console.log("email changed")}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                placeholder="Email"
              />
            </>
          ) : (
            <>
              <p className="font-medium">Shipping Address</p>
              <p className="text-gray-600 mb-2">{"shippingAddress"}</p>
              <p className="font-medium">Payment Method</p>
              <p className="text-gray-600 mb-2">{"paymentMethod"}</p>
            </>
          )}
        </div>

        {/* Toggle Edit Button */}
        <button
          onClick={console.log("isEditing")}
          className="bg-blue-500 text-white p-2 rounded-md w-full mb-4"
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>

        {/* Order History */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Order History</h2>
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Order #{order.id}</span>
                  <span className="text-gray-500">{order.date}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Status: {order.status}</span>
                  <span>Total: {order.total}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;