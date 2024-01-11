import React, { useState } from 'react';
import axios from 'axios';

const CarPeriodReservations = () => {
  const [plateId, setPlateId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reservations, setReservations] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:3000/customerReservation', {
        plateId,
        startDate,
        endDate
      });
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching car reservations:', error);
      // Handle error state
    }
  };

  return (
    <div>
      <h2>Car Reservations</h2>
      <div>
        <label>Car Plate ID:</label>
        <input
          type="text"
          value={plateId}
          onChange={(e) => setPlateId(e.target.value)}
        />
      </div>
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
      <button onClick={handleSearch}>Search</button>

    
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

     :
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

export default CarPeriodReservations;