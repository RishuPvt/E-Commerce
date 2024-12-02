import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import MidHeader from "../Header/MidHeader";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Registration Successful!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 px-4">
      <MidHeader />
      {/* Register Card */}
      <div className="w-full max-w-lg mt-10 p-8 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
          Create an Account
        </h2>
        <p className="text-base text-gray-500 text-center mb-8">
          Fill in your details to register and join us today.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-gray-600 font-medium text-lg"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: "Username is required",
                maxLength: {
                  value: 12,
                  message: "Username cannot exceed 12 characters",
                },
              })}
              className={`mt-2 w-full px-4 py-3 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm text-gray-800 text-lg focus:outline-none focus:ring-2 ${
                errors.username ? "focus:ring-red-400" : "focus:ring-teal-400"
              }`}
              placeholder="Enter a unique username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-gray-600 font-medium text-lg"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              {...register("fullName", { required: "Full name is required" })}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-600 font-medium text-lg"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`mt-2 w-full px-4 py-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm text-gray-800 text-lg focus:outline-none focus:ring-2 ${
                errors.email ? "focus:ring-red-400" : "focus:ring-teal-400"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-600 font-medium text-lg"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
              className={`mt-2 w-full px-4 py-3 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm text-gray-800 text-lg focus:outline-none focus:ring-2 ${
                errors.phone ? "focus:ring-red-400" : "focus:ring-teal-400"
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-gray-600 font-medium text-lg"
            >
              Address
            </label>
            <textarea
              id="address"
              {...register("address", { required: "Address is required" })}
              className={`mt-2 w-full px-4 py-3 border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm text-gray-800 text-lg focus:outline-none focus:ring-2 ${
                errors.address ? "focus:ring-red-400" : "focus:ring-teal-400"
              }`}
              placeholder="Enter your address"
              rows="3"
            ></textarea>
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* Password */}
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Password cannot exceed 15 characters",
                },
              })}
              className={`mt-2 w-full px-4 py-3 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm text-gray-800 text-lg focus:outline-none focus:ring-2 ${
                errors.password ? "focus:ring-red-400" : "focus:ring-teal-400"
              }`}
              placeholder="Create a password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-teal-600 hover:shadow-xl transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Switch to Login */}
        <p className="mt-6 text-center text-base text-gray-600">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-teal-500 font-semibold cursor-pointer hover:underline hover:text-teal-600 transition duration-200"
          >
            Log In
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;
