import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CarList from './CarList';
import CarDetails from './CarDetails';

const ReservationSlider = () => {
  const reservationSteps = [
    { id: 1, title: 'Reserve' },
    { id: 2, title: 'Pickup' },
    { id: 3, title: 'Return' },
    { id: 4, title: 'Payment' },
  ];

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...sliderSettings}>
      {reservationSteps.map((step) => (
        <div key={step.id}>
          <h2>{step.title}</h2>
          {/* You can customize the content for each reservation step here */}
        </div>
      ))}
    </Slider>
  );
};

const NewReservationPage = () => {
  const [step, setStep] = useState(1);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  const handleCarClick = (car) => {
    setSelectedCar(car);
    setStep(step + 1);
  };

  return (
    <div>
      <ReservationSlider />
      {step === 1 && (
        <div>
          {/* Render form for the reservation details */}
          <button onClick={() => handleCarClick()}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          {/* Render details form (brand, model, year, color, etc.) */}
          <CarList onCarClick={handleCarClick} />
        </div>
      )}

      {step === 3 && selectedCar && (
        <div>
          {/* Render selected car details */}
          <CarDetails car={selectedCar} />
          {/* Render button to go back to the details form */}
          <button onClick={() => setStep(step - 1)}>Back</button>
          {/* Render button for the next step */}
          <button onClick={() => handleStepChange(step + 1)}>Next</button>
        </div>
      )}

      {step === 4 && (
        <div>
          {/* Render payment form */}
          <button onClick={() => handleStepChange(step + 1)}>Next</button>
        </div>
      )}

      {step === 5 && (
        <div>
          {/* Render confirmation message */}
        </div>
      )}
    </div>
  );
};

export default NewReservationPage;
