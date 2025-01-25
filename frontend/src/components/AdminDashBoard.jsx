import React, { useEffect, useState } from "react";
import { axiosSubmissions } from "../../utils/api"; // Adjust the path as necessary
import "./AdminDashboard.css"; // Import a CSS file for styling
import SubmissionForm from "./SubmissionForm";
const AdminDashBoard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch submissions from API
  const fetchSubmissions = async () => {
    try {
      const response = await axiosSubmissions();
      setSubmissions(response.data || []);
    } catch (err) {
      console.error("Error fetching submissions:", err);
      setError("Failed to load submissions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  if (loading) {
    return <div className='loading'>Loading submissions...</div>;
  }

  if (error) {
    return <div className='error'>{error}</div>;
  }

  if (submissions.length === 0) {
    return <div className='no-data'>No submissions available.</div>;
  }

  // Handle switching users
  const handleUserChange = (event) => {
    const newIndex = parseInt(event.target.value, 10);
    setCurrentUserIndex(newIndex);
    setCurrentSlide(0); // Reset slide index when changing users
  };

  // Carousel navigation functions
  const handleNext = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % submissions[currentUserIndex].uploadedImages.length // Loop back to the start
    );
  };

  const handlePrev = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + submissions[currentUserIndex].uploadedImages.length) %
        submissions[currentUserIndex].uploadedImages.length // Loop back to the end
    );
  };

  return (
    <div className='dashboard-container'>
      <h1>Submissions Dashboard</h1>

      {/* User Selection Dropdown */}
      <div className='user-selector'>
        <label htmlFor='user-select'>Select User:</label>
        <select
          id='user-select'
          value={currentUserIndex}
          onChange={handleUserChange}
        >
          {submissions.map((user, index) => (
            <option key={index} value={index}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Carousel for Images */}
      <div className='carousel-container'>
        <button className='carousel-button prev' onClick={handlePrev}>
          &lt;
        </button>
        <div className='carousel'>
          <img
            src={submissions[currentUserIndex].uploadedImages[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className='carousel-image'
          />
        </div>
        <button className='carousel-button next' onClick={handleNext}>
          &gt;
        </button>
      </div>

      {/* User Info */}
      <div className='submission-info'>
        <h2>{submissions[currentUserIndex].name}</h2>
        <p>{submissions[currentUserIndex].email}</p>
        <p>
          {submissions[currentUserIndex].socialMediaHandle ||
            "No social media handle"}
        </p>
      </div>
      <div>
       
      </div>
    </div>
  );
};

export default AdminDashBoard;
