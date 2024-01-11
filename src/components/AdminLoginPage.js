import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../Admin.css';

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json(); // This line reads the response body

        // Assuming the server returns a token on successful login
        localStorage.setItem('adminToken', data.token);

        // Use navigate to redirect to the admin dashboard or another protected route
        navigate('/admin/admins');
        setFormData({
          email: '',
          password: '',
        });
      } else {
        console.error('Admin login failed');
      }
    } catch (error) {
      console.error('Error during admin login:', error.message);
    }

    // // Reset the form data if needed

  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <h2 style={{ color: '#007bff' }}>Admin Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ marginBottom: '10px' }}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ marginBottom: '10px' }}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Login
            </Button>
          </Form>
          <p className="mt-3">
            <Link to="/" style={{ color: '#007bff' }}>
              Back to Home
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLoginPage;
