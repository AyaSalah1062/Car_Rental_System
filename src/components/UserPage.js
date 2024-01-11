import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserPage = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Fetch user reservations when the component mounts
    fetchUserReservations();
  }, []);

  const fetchUserReservations = async () => {
    try {
      // Fetch user reservations from the server using the user's email
      const response = await fetch('http://localhost:3000/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.reservations.reservations); // Log the reservations to the console

        if (Array.isArray(data.reservations.reservations) && data.reservations.reservations.length > 0) {
          setReservations(data.reservations.reservations);
        } else {
          setReservations([]);
        }
      } else {
        console.error('Failed to fetch reservations:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching reservations:', error.message);
    }
  };

  // Function to format ISO date string to a readable format
  const formatDate = (isoDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(isoDate).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h2>User Page</h2>
      <Table striped bordered hover style={{ display: 'block' }}>
        <thead>
          <tr>
            <th>Reservation Number</th>
            <th>Plate ID</th>
            <th>Reservation Date</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Price</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(reservations) && reservations.length > 0 ? (
            reservations.map((reservation) => (
              <tr key={reservation.reservation_number}>
                <td>{reservation.reservation_number}</td>
                <td>{reservation.car_plate_id}</td>
                <td>{formatDate(reservation.reservation_date)}</td>
                <td>{formatDate(reservation.start_date)}</td>
                <td>{formatDate(reservation.end_date)}</td>
                <td>{reservation.reservation_price}</td>
                <td>{reservation.payment_status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No reservations found</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Link to="/user/new-reservation">
        <Button variant="primary">New Reservation</Button>
      </Link>
    </div>
  );
};

export default UserPage;
