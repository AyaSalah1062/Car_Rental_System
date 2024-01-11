import React from 'react';

const CarList = ({ cars, onCarClick }) => {
  return (
    <div>
      <h2>Available Cars</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id} onClick={() => onCarClick(car)}>
            {car.brand} - {car.model}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
