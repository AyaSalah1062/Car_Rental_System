import React from 'react';
import '../NewReservationPage.css';

const DatePicker = ({ label, selectedDate, onChange }) => {
  return (
    <div className="form-group">
      <label>{label}:</label>
      <input
        type="date"
        className="date-picker-input" // Added class name for styling
        value={selectedDate}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DatePicker;
