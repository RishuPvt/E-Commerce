import React from "react";
import { NavLink } from "react-router-dom";

function Login({ handleFlip }) {
  return (
    <div className="min-h-screen flex flex-col items-center px-4">
      {/* Login Card */}
      <div className="w-full max-w-md mt-10 p-8 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-4">
          Welcome Back
        </h2>
        <p className="text-base text-gray-500 text-center mb-6">
          Please enter your credentials to log in to your account.
        </p>
        <form className="space-y-8">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-600 font-medium text-lg"
            >
              Email Or Phone No.
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-600 font-medium text-lg"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-teal-600 hover:shadow-xl transition duration-300"
          >
            Log In
          </button>
        </form>

        {/* Switch to Sign Up */}
        <p className="mt-6 text-center text-base text-gray-600">
          Don’t have an account?{" "}
          <NavLink
            to="/register"
            className="text-indigo-500 font-semibold cursor-pointer hover:underline hover:text-teal-600 transition duration-200"
          >
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
