//CustomerReservations.js
import React, { useState } from 'react';
import axios from 'axios';

const CustomerReservations = () => {
  const [customerSSN, setCustomerSSN] = useState('');
  const [reservations, setReservations] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:3000/SSNReservations', {
        customerSSN,
      });
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching customer reservations:', error);
      // Handle error state
    }
  };

  return (
    <div>
      <h2>Customer Reservations</h2>
      <div>
        <label>Customer SSN:</label>
        <input
          type="text"
          value={customerSSN}
          onChange={(e) => setCustomerSSN(e.target.value)}
        />
      </div>
      
      <button onClick={handleSearch}>GENERATE!</button>

      <h3>Reservations:</h3>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.reservation_number}>
             Reservation Details:
      <li> {'Reservation Number:' + reservation.reservation_number}</li>
      
      <li>{'Start Date:' + new Date(reservation.start_date).toLocaleDateString()}</li>
      <li>{'End Date:' + new Date(reservation.end_date).toLocaleDateString()}</li>
      <li>{'Reservation Price:'+ reservation.reservation_price}</li>
      <li>{'Car Plate ID:'+reservation.car_plate_id}<br /></li>
      <li>{'Car: ' + reservation.car_brand + ' ' + reservation.car_model + ' ' + reservation.car_year}</li>
            Customer Details:
      <ul>
      <li>{'Customer SSN:'+ reservation.customer_ssn}</li>
        <li>{'First Name: ' + reservation.customer_first_name}</li>
        <li>{'Last Name: ' + reservation.customer_last_name}</li>
        <li>{'Email: ' + reservation.customer_email}</li>
        <li>{'Phone: ' + reservation.phone}</li>
        
        {/* Exclude sensitive data */}
      </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerReservations;