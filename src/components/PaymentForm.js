// PaymentForm.js
import React from 'react';

const PaymentForm = ({ car, pickupDate, returnDate, onReserve }) => {
  return (
    <div>
      <h3>Reservation Summary</h3>
      <p>Car: {car ? `${car.brand} ${car.model}` : 'No car selected'}</p>
      <p>Pickup Date: {pickupDate || 'Not selected'}</p>
      <p>Return Date: {returnDate || 'Not selected'}</p>
      {/* Additional payment form elements can be added here */}
      <button onClick={onReserve}>Confirm Reservation</button>
    </div>
  );
};

export default PaymentForm;
