import React, { useState } from 'react';
import axios from 'axios';

function DailyPayment() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dailyPayments, setDailyPayments] = useState([]);

  const getDailyPayments = async () => {
    try {
      const response = await axios.post('http://localhost:3000/dailyPayments', {
        startDate,
        endDate
      });

      // Extract dailyPayments array from response data
      const { dailyPayments } = response.data;
      setDailyPayments(dailyPayments || []); // Set to an empty array if dailyPayments is undefined
    } catch (error) {
      console.error('Error fetching daily payments:', error);
    }
  };

  return (
    <div>
      <label htmlFor="startDate">Start Date:</label>
      <input
        type="date"
        id="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <label htmlFor="endDate">End Date:</label>
      <input
        type="date"
        id="endDate"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <button onClick={getDailyPayments}>Get Daily Payments</button>

      <div>
        <h2>Daily Payments:</h2>
        <ul>
          {dailyPayments.map((payment, index) => (
            <li key={index}>
              Date: {new Date (payment.payment_date).toLocaleDateString()}, Total Payment: {payment.total_daily_payment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DailyPayment;