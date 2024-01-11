import React, { useState } from 'react';
import axios from 'axios';

const PeriodReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reservations, setReservations] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:3000/periodReport', {
        startDate,
        endDate
      });
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      // Handle error state
    }
  };

  return (
    <div>
      <h2>Reservations within a Specified Period</h2>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button onClick={handleSearch}>GENERATE!</button>

      <h3>Reservations:</h3>
      <ul>
  {reservations.map((reservation) => (
    <li key={reservation.reservation_number}>
        Reservation Details:
        <ul>
      <li> {'Reservation Number:' + reservation.reservation_number}</li>
      <li>{'Reservation Number:' + reservation.reservation_number}</li>
      <li>{'Customer SSN:'+ reservation.customer_ssn}</li>
      <li>{'Car Plate ID:'+reservation.car_plate_id}<br /></li>
      <li>{'Start Date:' + new Date(reservation.start_date).toLocaleDateString()}</li>
      <li>{'End Date:' + new Date(reservation.end_date).toLocaleDateString()}</li>
      <li>{'Reservation Price:'+ reservation.reservation_price}</li>
      <li>{'Payment Status:' + reservation.payment_status}</li>
      </ul>
      
      Customer Details:
      <ul>
        <li>{'First Name: ' + reservation.customer_first_name}</li>
        <li>{'Last Name: ' + reservation.customer_last_name}</li>
        <li>{'Email: ' + reservation.customer_email}</li>
        <li>{'Phone: ' + reservation.phone}</li>
        
        {/* Exclude sensitive data */}
      </ul>
      Car Details:
      <ul>
        <li>{'Brand: ' + reservation.car_brand}</li>
        <li>{'Model: ' + reservation.car_model}</li>
        <li>{'Year: ' + reservation.car_year}</li>
        <li>{'Color: ' + reservation.color}</li>
        <li>{'Office ID: ' + reservation.office_id}</li>
        {/* Exclude sensitive data */}
      </ul>
    </li>
  ))}
</ul>
    </div>
  );
};

export default PeriodReport;