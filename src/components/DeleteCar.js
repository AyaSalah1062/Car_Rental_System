import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteCar = () => {
  const navigate = useNavigate();

  const [plateId, setPlateId] = useState('');

  const handleChange = (e) => {
    setPlateId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send plateId to the backend for car deletion
      await axios.delete('http://localhost:3000/deleteCar', {
        data: { plateId } // Pass plateId in the request body
      });
      alert('Car deleted successfully');
      navigate('/admin/admins'); 
      setPlateId(''); // Clear the input after successful deletion
    } catch (error) {
      console.error('Error deleting car:', error);
      alert('Failed to delete car');
    }
  };

  return (
    <div>
      <h2>Delete Car</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Plate ID:
          <input type="text" value={plateId} onChange={handleChange} />
        </label>
        <button type="submit">Delete Car</button>
      </form>
    </div>
  );
};

export default DeleteCar;