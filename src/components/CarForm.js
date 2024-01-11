import React, { useState } from 'react';
import axios from 'axios';
import '../Admin.css'; // Import the CSS file'
import { useNavigate } from 'react-router-dom';
const CarForm = () => {
    const navigate = useNavigate();
    const [carData, setCarData] = useState({
    plate_id: '',
    brand: '',
    model: '',
    year: '',
    color: '',
    price: '',
    status: '',
    description: '',
    car_seats: '',
    transmission: '',
    office_id: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send carData to the backend
      const response = await axios.post('http://localhost:3000/addCar', carData);
      console.log(response.data);
      alert('Car added successfully'); // Show a success message
      navigate('/admin/admins'); 
    } //catch (error) {
      //console.error('Error adding car:', error);
      //alert('Failed to add car'); // Show an error message
    //}
    catch (error) {
        console.error('Error adding car:', error.response); // Log the error response
        alert('Failed to add car. Check console for details.'); // Display an error message
      }
  };

  return (
    <div>
      <h2>Add a New Car</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Plate ID:
          <input type="text" name="plate_id" value={carData.plate_id} onChange={handleChange} />
        </label>
        <label>
          Brand:
          <input type="text" name="brand" value={carData.brand} onChange={handleChange} />
        </label>
        <label>
          Model:
          <input type="text" name="model" value={carData.model} onChange={handleChange} />
        </label>
        <label>
          Year:
          <input type="number" name="year" value={carData.year} onChange={handleChange} />
        </label>
        <label>
          Color:
          <input type="text" name="color" value={carData.color} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={carData.price} onChange={handleChange} />
        </label>
        <label>
          Status:
          <input type="text" name="status" value={carData.status} onChange={handleChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={carData.description} onChange={handleChange} />
        </label>
        <label>
          Car Seats:
          <input type="number" name="car_seats" value={carData.car_seats} onChange={handleChange} />
        </label>
        <label>
          Transmission:
          <input type="text" name="transmission" value={carData.transmission} onChange={handleChange} />
        </label>
        <label>
          Office ID:
          <input type="number" name="office_id" value={carData.office_id} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CarForm;