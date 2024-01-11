import React, { useState, useEffect } from 'react';

const CarDetails = ({ onSelectCar }) => {
  const [carDetails, setCarDetails] = useState({
    brands: [],
    models: [],
    years: [],
    colors: [],
    seats: [],
    transmissions: [],
  });

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch('http://localhost:3000/car-details');
        if (response.ok) {
          const data = await response.json();
          setCarDetails(data);
        } else {
          console.error('Failed to fetch car details');
        }
      } catch (error) {
        console.error('Error during fetch car details:', error.message);
      }
    };

    fetchCarDetails();
  }, []);

  return (
    <div>
      <label>
        Brand:
        <select onChange={(e) => onSelectCar('brand', e.target.value)}>
          {carDetails.brands.map((brand) => (
            <option key={brand.id} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Model:
        <select onChange={(e) => onSelectCar('model', e.target.value)}>
          {carDetails.models.map((model) => (
            <option key={model.id} value={model.name}>
              {model.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Year:
        <select onChange={(e) => onSelectCar('year', e.target.value)}>
          {carDetails.years.map((year) => (
            <option key={year.id} value={year.year}>
              {year.year}
            </option>
          ))}
        </select>
      </label>

      <label>
        Color:
        <select onChange={(e) => onSelectCar('color', e.target.value)}>
          {carDetails.colors.map((color) => (
            <option key={color.id} value={color.name}>
              {color.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Seats:
        <select onChange={(e) => onSelectCar('seats', e.target.value)}>
          {carDetails.seats.map((seats) => (
            <option key={seats.id} value={seats.count}>
              {seats.count}
            </option>
          ))}
        </select>
      </label>

      <label>
        Transmission:
        <select onChange={(e) => onSelectCar('transmission', e.target.value)}>
          {carDetails.transmissions.map((transmission) => (
            <option key={transmission.id} value={transmission.type}>
              {transmission.type}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default CarDetails;
