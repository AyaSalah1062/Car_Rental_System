// NewReservationPage.js
import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PaymentPage from './PaymentPage';
import '../NewReservationPage.css';
import DatePicker from './DatePicker';


const NewReservationPage = () => {
  const sliderRef = useRef(null);
  const [carDetails, setCarDetails] = useState({
    brands: [],
    models: [],
    years: [],
    colors: [],
    seats: [],
    transmissions: [],
  });

  const [selectedCar, setSelectedCar] = useState({
    brand: '',
    model: '',
    year: '',
    color: '',
    seats: '',
    transmission: '',
  });

  const [searchResults, setSearchResults] = useState([]);
  const [step, setStep] = useState(1);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [reserveButtonClicked, setReserveButtonClicked] = useState(false);

  const [creditCard, setCreditCard] = useState({
    ssn: '',
    cardNumber: '',
    cvv: '',
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

  const handleCarSelection = (key, value) => {
    setSelectedCar((prevSelectedCar) => ({
      ...prevSelectedCar,
      [key]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      console.log('Sending search request...');
      const response = await fetch('http://localhost:3000/SearchCars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedCar),
      });

      if (response.ok) {
        console.log('Search request successful!');
        const data = await response.json();
        setSearchResults(data.cars);

        // Move to the next step using slickGoTo
        if (sliderRef.current) {
          sliderRef.current.slickGoTo(1);
        }
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error(`Error during search: ${error.message}`);
    }
  };

  const handleReserve = (car) => {
    // Add logic to handle the reserve action for the selected car
    setSelectedCar(car);
    // Update creditCard object with car details
    // setCreditCard({
    //   ...creditCard,
    //   plate_id: car.plate_id,
    //   brand: car.brand,
    //   model: car.model,
    //   year: car.year,
    //   color: car.color,
    //   seats: car.seats,
    //   transmission: car.transmission,
    // });
    setStep(step + 1); // Move to the next step
  };

  const [availabilityMessage, setAvailabilityMessage] = useState('');

  const handleCheckAvailability = async () => {
    try {
      console.log('Selected Car:', selectedCar);
      const pricePerDay = selectedCar.price; // Adjust this based on your actual data structure

      const response = await fetch('http://localhost:3000/dates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          car: selectedCar,
          pickupDate,
          returnDate,
          pricePerDay,
        }),
      });

      console.log('Server response status:', response.status);

      if (response.ok) {
        const data = await response.json();

        if (data.error) {
          // Handle specific error messages from the server
          console.error('Error checking car availability:', data.error);
          setErrorMessage(`Error: ${data.error}`);
        } else if (data.availableMessage) {
          // Car is available for the specified dates
          // console.log('Car is available for the specified dates:', data.availableMessage);
          // setAvailabilityMessage(data.availableMessage);
          // Move to the next step using slickGoTo

        } else {
          // Car is not available for the specified dates
          console.log('Car is not available for the specified dates');
          // setAvailabilityMessage('Car is not available for the specified dates');
          // Handle accordingly        
          if (sliderRef.current) {
            console.log('Moving to the next page...');
            sliderRef.current.slickGoTo(3); // Assuming the PaymentPage is at index 3
          }
        }

      } else {
        // Handle non-ok response
        console.error('Failed to check car availability. Server responded with:', response.status, response.statusText);
        setErrorMessage('Failed to check car availability. Please try again later.');
      }
    } catch (error) {
      // Handle network or other fetch-related errors
      console.error('Error during car availability check:', error.message);
      setErrorMessage('Error during car availability check. Please try again.');
    }
  };



  const handleDateSelection = (date) => {
    // Implement date selection logic here
    console.log('Selected Date:', date);
  };

  const handleNextStep = () => {
    // Implement logic to navigate to the next step
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    // Implement logic to go back to the previous step
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
      setStep((prevStep) => prevStep - 1);
    }
  };

  const handleCreditCardInput = (key, value) => {
    setCreditCard((prevCreditCard) => ({
      ...prevCreditCard,
      [key]: value,
    }));
  };

  // Assuming this function is inside your React component
  const handlePaymentSubmit = async () => {
    try {
      console.log('Price per Day:', selectedCar.price); // New line to log the price per day
      // Implement logic to handle payment submission
      console.log('Credit Card Details:', creditCard);

      const response = await fetch('http://localhost:3000/credit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(creditCard),
      });

      if (response.ok) {
        const data = await response.json();

        // Display success message to the user
        alert(data.message);

        // Optionally, you can update the UI or perform other actions based on the response
        console.log('Total Price:', data.totalPrice);

        // Perform any other logic you need to do after successful saving of credit card details
      } else {
        const errorData = await response.json();

        // Display error message to the user
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      // Handle network or other fetch-related errors
      console.error('Error during credit card submission:', error.message);
      alert('Error during credit card submission. Please try again.');
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="reservation-container">
      <h1>New Reservation</h1>

      <Slider ref={sliderRef} {...sliderSettings}>
        {/* Step 1 */}
        <div className="reservation-step">
          <h2>Reserve</h2>
          {/* Render combo boxes for all car specifications */}
          <div className="form-group">
            <label>
              Brand:
              <select onChange={(e) => handleCarSelection('brand', e.target.value)}>
                <option value="" key="brand-placeholder">
                  Select a brand
                </option>
                {carDetails.brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>
              Model:
              <select onChange={(e) => handleCarSelection('model', e.target.value)}>
                <option value="" key="model-placeholder">
                  Select a model
                </option>
                {carDetails.models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>
              Year:
              <select onChange={(e) => handleCarSelection('year', e.target.value)}>
                <option value="" key="year-placeholder">
                  Select a year
                </option>
                {carDetails.years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>
              Color:
              <select onChange={(e) => handleCarSelection('color', e.target.value)}>
                <option value="" key="color-placeholder">
                  Select a color
                </option>
                {carDetails.colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>
              Seats:
              <select onChange={(e) => handleCarSelection('seats', e.target.value)}>
                <option value="" key="seats-placeholder">
                  Select number of seats
                </option>
                {carDetails.seats.map((seats) => (
                  <option key={seats} value={seats}>
                    {seats}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>
              Transmission:
              <select onChange={(e) => handleCarSelection('transmission', e.target.value)}>
                <option value="" key="transmission-placeholder">
                  Select a transmission type
                </option>
                {carDetails.transmissions.map((transmission) => (
                  <option key={transmission} value={transmission}>
                    {transmission}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              Office Location:
              <select>
                <option value="" key="office-location-placeholder">
                  Select an office location
                </option>
                {["Cairo", "New York", "China", "Paris"].map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
          </label>
        </div>

        {/* Render the Search button */}
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
    </div>

        {/* Step 2 */ }
  <div className="reservation-step">
    <h2>Select Car</h2>
    {/* Render car search results */}
    {searchResults.map((car) => (
      <div key={car.plate_id}>
        <h3>{car.brand}</h3>
        <img src={car.photo_url} alt={car.plate_id} title={`Description: ${car.description}`} />

        <button
          className={`reserve-button ${selectedCar && selectedCar.plate_id === car.plate_id ? 'selected' : ''}`}
          onClick={() => {
            setSelectedCar(car);
            handleReserve(car);

            // Move to the next step using slickGoTo
            if (sliderRef.current) {
              sliderRef.current.slickGoTo(2);
            }
          }}
        >
          {selectedCar && selectedCar.plate_id === car.plate_id ? 'Selected!' : 'Select Car'}
        </button>
      </div>
    ))}
  </div>

  {/* Step 3 */ }
  <div className="reservation-step">
    <h2>Choose Pickup and Return Date</h2>
    {/* Render date selection components */}
    <DatePicker label="Pickup Date" selectedDate={pickupDate} onChange={setPickupDate} />
    <DatePicker label="Return Date" selectedDate={returnDate} onChange={setReturnDate} />
    {/* Render the Next button */}
    <button className="next-button" onClick={handleCheckAvailability}>
      Next
    </button>
    {errorMessage && <div className="error-message">{errorMessage}</div>}
    {availabilityMessage && <div>{availabilityMessage}</div>}

  </div>

  {/* Step 4 */ }
  <PaymentPage
    handleNextStep={handleNextStep}
    handleCreditCardInput={handleCreditCardInput}
    creditCard={creditCard}
    handlePaymentSubmit={handlePaymentSubmit}
  />

  {/* Additional steps */ }
  {/* You can add more steps and corresponding form elements */ }
  <div className="reservation-step">
    <h2>Next Step</h2>
    {/* Render form elements for the next step */}
    <button className="next-button" onClick={handleNextStep}>
      Next
    </button>
  </div>
      </Slider >
  <button className="btn btn-outline-secondary" onClick={handleBack}>
    &larr; Back
  </button>
    </div >
  );
};

export default NewReservationPage;
