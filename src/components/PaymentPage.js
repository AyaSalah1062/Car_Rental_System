import React, { useState, useEffect } from 'react';
import '../NewReservationPage.css';

const PaymentPage = ({ handleNextStep, handleCreditCardInput, creditCard, handlePaymentSubmit }) => {
  const [pricePerDay, setPricePerDay] = useState(null);
  const [reservationStatus, setReservationStatus] = useState('');

  useEffect(() => {
    // Fetch the price per day when the component mounts
    fetchPricePerDay();
  }, []);

  const fetchPricePerDay = async () => {
    try {
      const response = await fetch(`http://localhost:3000/car-price/${creditCard.plate_id}`);
      const data = await response.json();

      if (response.ok) {
        setPricePerDay(data.price);
      } else {
        console.error('Failed to fetch price per day:', data.error);
        // Handle the error accordingly
      }
    } catch (error) {
      console.error('Error during price per day fetch:', error.message);
      // Handle the error accordingly
    }
  };

  const handlePaymentSubmitFn = async () => {
    // Assume you have a payment logic here
    // After successful payment, update the reservation status
    // This is just a placeholder, replace it with your actual logic
    const paymentSuccess = true;

    if (paymentSuccess) {
      setReservationStatus('Successfully Reserved!');
      // You can also perform additional actions here, such as printing or displaying a modal
    } else {
      setReservationStatus('Reservation Failed. Please try again.');
    }
  };

  const handleCheckReservationStatus = () => {
    // Display the reservation status when the button is clicked
    alert(reservationStatus);
    // You can also perform additional actions here, such as printing or displaying a modal
  };

  return (
    <div>
      {/* <p>Price per Day: ${pricePerDay}</p> */}
      {/* Rest of your component */}
      <div className="payment-container">
        <h1>Payment</h1>
        <div className="payment-step">
          {/* Render credit card input fields */}
          <div className="form-group">
            <label>
              Social Security Number:
              <input
                type="text"
                value={creditCard.ssn}
                onChange={(e) => handleCreditCardInput('ssn', e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Card Number:
              <input
                type="text"
                value={creditCard.cardNumber}
                onChange={(e) => handleCreditCardInput('cardNumber', e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              CVV:
              <input
                type="text"
                value={creditCard.cvv}
                onChange={(e) => handleCreditCardInput('cvv', e.target.value)}
              />
            </label>
          </div>

          {/* Render the Submit button */}
          <button className="btn btn-primary" onClick={handlePaymentSubmitFn}>
            Submit Payment
          </button>

          {/* Render the Check Reservation Status button */}
          <button className="btn btn-secondary" onClick={handleCheckReservationStatus}>
            Reserve
          </button>

          {/* Display reservation status */}
          {reservationStatus && <p>{reservationStatus}</p>}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
