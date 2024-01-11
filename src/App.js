import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import UserLoginPage from './components/UserLoginPage';
import UserSignupPage from './components/UserSignupPage';
import AdminLoginPage from './components/AdminLoginPage';
import Admins from './components/admins'; // Import the Admins component
import CarForm from './components/CarForm'; // Import the CarForm component
import UpdateCar from './components/UpdateCar'; // Import the UpdateCar component
import DeleteCar from './components/DeleteCar'; // Import the DeleteCar component
import PeriodReport from './components/PeriodReport'; // Import the PeriodReport component
import CarPeriodReservations from './components/CarPeriodReservations'; // Import the CarPeriodReservations component
import DayStatus from './components/DayStatus'; // Import the DayStatus component
import CustomerReservations from './components/CustomerReservations'; // Import the CustomerReservations component
import DailyPayment from './components/DailyPayment'; // Import the DailyPayment component
import UserPage from './components/UserPage';
import NewReservationPage from './components/NewReservationPage';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customer/login" element={<UserLoginPage />} />
          <Route path="/customer/signup" element={<UserSignupPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/admins" element={<Admins/>} />
          <Route path="/add-car" element={<CarForm />} />
          <Route path="/update-car" element={<UpdateCar />} />
          <Route path="/delete-car" element={<DeleteCar />} />
          <Route path="/period-report" element={<PeriodReport />} />
          <Route path="/car-reservations-report" element={<CarPeriodReservations />} />
          <Route path="/day-status-report" element={<DayStatus />} />
          <Route path="/customer-reservations" element={<CustomerReservations />} />
          <Route path="/daily-payments" element={<DailyPayment />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/new-reservation" element={<NewReservationPage />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
