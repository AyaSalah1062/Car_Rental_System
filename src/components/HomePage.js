// client/src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import '../App.css';

const HomePage = () => {
  return (
    <Container fluid className="home-page">
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          {/* <h1 className="display-4">Welcome to the Car Rental System</h1> */}
          {/* <p className="lead mt-3">Choose your role:</p> */}
        </Col>
      </Row>
      <Row className="justify-content-center buttons-container">
        <Col xs={12} md={6} className="text-center">
          <Link to="/customer/signup">
            <Button variant="success" className="button">
              Customer
            </Button>
          </Link>
          <Link to="/admin/login">
            <Button variant="info" className="button">
              Admin 
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
