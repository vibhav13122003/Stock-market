import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import signupImage from "../assets/signupImage.jpg";
import { axiosSignup } from "../utils/api";
import { axiosPortfolioValue, axiosAssignRandom } from "../utils/api";


const SignupForm = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    balance: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosSignup(formData);
       const userId = response.data.user.id; 
       await axiosAssignRandom(userId);
      console.log("Signup successful:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className='flex flex-col md:flex-row h-screen overflow-hidden bg-gray-50'>
      {/* Left Section: Form */}
      <div className='flex flex-col justify-center items-center w-full md:w-1/2 bg-stone-950 px-8 py-16 '>
        <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md transition-shadow duration-1000 hover:shadow-2xl hover:shadow-cyan-400'>
          <h1 className='text-3xl font-extrabold text-gray-800 text-center mb-6'>
            Welcome to TrackPORT
          </h1>
          <form onSubmit={handleSubmit}>
           

            <div className='mb-4'>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='email'
              >
                Email Address
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm !outline-none focus:ring-2'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your email'
              />
            </div>

            <div className='mb-4'>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='password'
              >
                Create Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm focus:ring-2 !outline-none'
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter your password'
              />
            </div>
            <div className='mb-4'>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='name'
              >
                Your Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm focus:ring-2 !outline-none'
                value={formData.name}
                onChange={handleChange}
                placeholder='Enter your full name'
              />
            </div>

            <div className='mb-4'>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='balance'
              >
                Balance
              </label>
              <input
                type='number'
                id='balance'
                name='balance'
                className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm focus:ring-2 !outline-none'
                value={formData.balance}
                onChange={handleChange}
                placeholder='Enter initial balance'
              />
            </div>

            <div className='flex items-center mb-4'>
              <input
                type='checkbox'
                id='terms'
                required
                className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
              />
              <label
                htmlFor='terms'
                className='ml-2 block text-sm text-gray-900'
              >
                I agree to the{" "}
                <a href='/terms' className='text-blue-600 hover:underline'>
                  Terms of Service
                </a>
              </label>
            </div>

            <button className='mt-4 w-full py-2 px-4 bg-blue-700 text-white text-sm font-medium rounded-md shadow-md hover:bg-blue-900 transition duration-200'>
              Sign Up
            </button>

            <p className='mt-4 text-center text-sm text-gray-600'>
              Already have an account?{" "}
              <a href='/login' className='text-blue-600 hover:underline'>
                Login
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Right Section: Image */}
      <div
        className='md:flex w-1/2 items-center justify-center'
        style={{
          //   background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${signupImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className='text-center text-white px-8'>
          <h2 className='text-2xl font-bold mb-4'>
            Discover Insights with Ease
          </h2>
          <p className='text-lg'>
            Track market trends and analytics effortlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
