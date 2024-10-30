import React from 'react';
import { FaUserEdit, FaShoppingBag } from 'react-icons/fa';
import TopHead from "../Header/TopHead";
import MidHeader from "../Header/MidHeader";

const UserProfile = ({ user }) => {
  return (
    <div className="bg-gradient-to-b from-blue-100 to-white min-h-screen">
      <TopHead />
      <MidHeader />
      <div className="container mx-auto px-4 py-10">
        
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-8 mb-10 transition-transform duration-300 hover:scale-105">
          <div className="flex flex-col items-center md:items-start md:w-1/4 mb-6 md:mb-0">
            <img
              src={user.profileImage}
              alt={user.username}
              className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-blue-300"
            />
            <button className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-full font-medium shadow-md hover:bg-blue-700 transition duration-200 flex items-center">
              <FaUserEdit className="mr-2" /> Edit Profile
            </button>
          </div>

          <div className="md:w-3/4 md:pl-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">{user.fullName}</h2>
            <p className="text-gray-500 text-lg">@{user.username}</p>
            <div className="mt-6 text-gray-700 space-y-3">
              <p><span className="font-semibold text-blue-700">Address:</span> {user.address}</p>
              <p><span className="font-semibold text-blue-700">Email:</span> {user.email}</p>
            </div>
          </div>
        </div>

        {/* Shopping History Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 transition-transform duration-300 hover:scale-105">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">Shopping History</h3>
          {user.shoppingHistory.length === 0 ? (
            <p className="text-gray-700 text-lg">No purchases yet.</p>
          ) : (
            <div className="space-y-6">
              {user.shoppingHistory.map((order, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">{order.productName}</h4>
                      <p className="text-gray-500 text-sm">Order Date: {order.date}</p>
                    </div>
                    <span className="text-green-600 font-bold text-lg">${order.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-500 mt-2">Quantity: {order.quantity}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Example usage of the UserProfile component with sample user data
const App = () => {
  const user = {
    profileImage: "https://example.com/profile-image.jpg",
    username: "Rishu17289",
    fullName: "RISHU RAJ",
    address: "1234 Street, KnowledgePark, GN",
    email: "Rishuraj@example.com",
    shoppingHistory: [
      { productName: "Wireless Headphones", price: 49.99, date: "2024-09-15", quantity: 1 },
      { productName: "Smart Watch", price: 119.99, date: "2024-09-20", quantity: 1 },
      { productName: "Portable Charger", price: 29.99, date: "2024-09-25", quantity: 2 },
    ],
  };

  return <UserProfile user={user} />;
};

export default App;
