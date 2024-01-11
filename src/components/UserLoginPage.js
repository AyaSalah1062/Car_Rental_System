import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const UserLoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        navigate('/user');
        setFormData({
          email: '',
          password: '',
        });
      } else {
        // Try to parse the response as JSON; if it fails, treat it as plain text
        const errorData = response.ok ? await response.json() : await response.text();
        console.error('Error during login:', errorData);
        setError('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="login-container mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <h2 className="mb-4">Welcome!</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          <p className="mt-3">
            Don't have an account? <Link to="/customer/signup">Signup here</Link>.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default UserLoginPage;
