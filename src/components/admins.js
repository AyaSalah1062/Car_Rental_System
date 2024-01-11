import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import '../Admin.css';
const ActionButtons = () => {

  const [selectedOption, setSelectedOption] = useState('');
  const [showReportButtons, setShowReportButtons] = useState(false);
  const [searchOption, setSearchOption] = useState('car'); // Default search option
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log(`Search ${searchOption} clicked`);
    // Implement search functionality based on the selected option
    // Redirect to the search page with selected option
    navigate(`/search-${searchOption}`);
  };
  const handleReportClick = (reportPath) => {
    setSelectedOption(reportPath);
    navigate(reportPath);
  };

  const handleGenerateReport = async () => {
    try {
      // Send a request to generate the report here

      // Assuming successful report generation, show the buttons
      setShowReportButtons(true);
    } catch (error) {
      console.error('Error generating report:', error.response);
      alert('Failed to generate report. Check console for details.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Clear the token from local storage
    navigate('/admin/login'); // Redirect to the admin login page

  };

  return (
    <div className="container">
      <div className="left-container">
        <img src="https://th.bing.com/th/id/OIF.nD4bwlyuP6apjP9K6Iq4mA?w=163&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Dashboard Photo" className="dashboard-photo" />
        <h2 className="h2 underlined-title">RAR CARS Dashboard</h2>
        <p>Welcome to our system!</p>
      </div>
      <div className="right-container">
        <div className="action-buttons-container">
          <h3>Actions</h3>
          <Link to="/add-car" className="btn btn-primary action-button">
            Add Car
          </Link>
          <Link to="/update-car" className="btn btn-primary action-button">
            Update Car
          </Link>
          <Link to="/delete-car" className="btn btn-primary action-button">
            Delete Car
          </Link>
          <Dropdown>
            <Dropdown.Toggle variant="primary" className="action-button" id="dropdown-basic">
              Search Options
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/search-car">
                Search Car
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/search-reservation">
                Search Reservation
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/search-customer">
                Search Customer
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div>
            <Dropdown>
              <Dropdown.Toggle variant="primary" className="action-button" id="dropdown-basic">
                Generate Report
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleGenerateReport}>Generate Report</Dropdown.Item>
                <Dropdown.Item onClick={() => handleReportClick('/period-report')}>
                  Report Within a Period
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleReportClick('/car-reservations-report')}>
                  Car Reservations Report
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleReportClick('/day-status-report')}>
                  Day Car Status Report
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleReportClick('/customer-reservations')}>
                  Customer Reservations
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleReportClick('/daily-payments')}>
                  Daily Payments
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {selectedOption && (
              <div>
                <Link to={selectedOption} className="btn btn-primary action-button">
                  Go to {selectedOption}
                </Link>
              </div>
            )}

            <div>
              <button onClick={handleLogout} className="btn btn-danger action-button">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;
