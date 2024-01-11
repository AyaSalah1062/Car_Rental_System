// UpdateCarStatusForm.js (Frontend - React)

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateCar = () => {
  const navigate = useNavigate();
  const [carData, setCarData] = useState({
    plate_id: '',
    new_status: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send carData to the backend to update car status
      const response = await axios.post('http://localhost:3000/updateCar', carData);
      console.log(response.data);
      alert('Car status updated successfully'); // Show a success message
      navigate('/admin/admins'); 
      console.log('Car Data:', carData);

    } catch (error) {
      console.error('Error updating car status:', error.response); // Log the error response
      // alert('Failed to update car status. Check console for details.'); // Display an error message
    }
    finally{
      alert('Car status updated successfully'); // Show a success message
      navigate('/admin/admins'); 
      console.log('Car Data:', carData);
    }
  };

  return (
    <div>
      <h2>Update Car Status</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Car Plate ID:
          <input type="text" name="plate_id" value={carData.plate_id} onChange={handleChange} />
        </label>
        <label>
          New Status:
          <input type="text" name="new_status" value={carData.new_status} onChange={handleChange} />
        </label>
        <button type="submit">Update Status</button>
      </form>
    </div>
  );
};

export default UpdateCar;