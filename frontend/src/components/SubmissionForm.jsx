import React, { useState } from "react";
import axios from "axios";

const SubmissionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    socialMedia: "",
    images: ["", "", "", ""],
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // New loading state for form submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, index) => {
    const files = e.target.files;
    if (files && files[0]) {
      const updatedImages = [...formData.images];
      updatedImages[index] = files[0];
      setFormData({ ...formData, images: updatedImages });
    }
  };

  const handleSubmit = async (e) => {
    console.log("Form data:", formData);
    e.preventDefault();
    setLoading(true);
    try {
      // Preparing FormData to send images and other form data
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("password", formData.password);
      formDataToSubmit.append("socialMedia", formData.socialMedia);

      formData.images.forEach((image, index) => {
        if (image) formDataToSubmit.append(`image${index + 1}`, image);
      });

      // Sending form data to the API
      const response = await axios.post(
        "http://localhost:5000/user/register",
        formDataToSubmit
      );

      if (response.status === 200) {
        setMessage("Form submitted successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          socialMedia: "",
          images: ["", "", "", ""],
        });
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Submission failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-lg mx-auto mt-10 space-y-4'>
      <h2 className='text-2xl font-bold text-center'>Register</h2>
      {message && <p className='text-center text-red-500'>{message}</p>}
      <div>
        <label htmlFor='name' className='block font-medium'>
          Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
          className='w-full p-2 border rounded'
        />
      </div>
      <div>
        <label htmlFor='email' className='block font-medium'>
          Email
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
          className='w-full p-2 border rounded'
        />
      </div>
      <div>
        <label htmlFor='password' className='block font-medium'>
          Password
        </label>
        <input
          type='password'
          id='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          required
          className='w-full p-2 border rounded'
        />
      </div>
      <div>
        <label htmlFor='socialMedia' className='block font-medium'>
          Social Media
        </label>
        <input
          type='text'
          id='socialMedia'
          name='socialMedia'
          value={formData.socialMedia}
          onChange={handleChange}
          className='w-full p-2 border rounded'
        />
      </div>
      <div>
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className='mb-2'>
            <label htmlFor={`image${index}`} className='block font-medium'>
              Image {index + 1}
            </label>
            <input
              type='file'
              id={`image${index}`}
              accept='image/*'
              onChange={(e) => handleFileChange(e, index)}
              className='w-full'
            />
          </div>
        ))}
      </div>
      <button
        type='submit'
        className='w-full bg-blue-500 text-white p-2 rounded'
        disabled={loading} // Disable button while submitting
      >
        {loading ? "Submitting..." : "Register"}
      </button>
    </form>
  );
};

export default SubmissionForm;
