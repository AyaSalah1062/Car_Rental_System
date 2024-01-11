  import React, { useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { Form, Button, Container, Row, Col } from 'react-bootstrap';
  import '../App.css';

  const UserSignupPage = () => {
    const [formData, setFormData] = useState({
      ssn: '',
      firstName: '',
      lastName: '',
      birthdate: '',
      phone: '',
      email: '',
      password: '',
      sex: '',
      address: '',
    });
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
  
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
        console.log('Form Data:', formData);
  
        const response = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        console.log(response);
  
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log('Signup successful:', data);
          } else {
            console.error('Signup failed. Unexpected response format:', await response.text());
          }
  
          setFormData({
            ssn: '',
            firstName: '',
            lastName: '',
            birthdate: '',
            phone: '',
            email: '',
            password: '',
            sex: '',
            address: '',
          });
  
          history('/customer/login');
        } else {
          const errorData = await response.json();
          console.error('Signup failed:', errorData.message);
        }
      } catch (error) {
        console.error('Error during signup:', error);
      
        // Optionally, check if the error response is available
        if (error.response) {
          const errorData = await error.response.json();
          console.error('Signup failed:', errorData.message);
        } else {
          console.error('Unexpected error:', error.message);
        }
      } finally {
        setLoading(false);
      }
    };
  
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <h2>Signup</h2>
          <Form onSubmit={handleSubmit}>
                 <Form.Group controlId="formSSN">
                 <Form.Label>SSN</Form.Label>
                 <Form.Control
                type="text"
                name="ssn"
                value={formData.ssn}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBirthdate">
              <Form.Label>Birthdate</Form.Label>
              <Form.Control
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
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
              />
            </Form.Group>

            <Form.Group controlId="formSex">
              <Form.Label>Sex</Form.Label>
              <Form.Control
                as="select"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
              {loading ? 'Signing up...' : 'Signup'}
            </Button>
          </Form>
          <p className="mt-3">
            Already have an account? <Link to="/customer/login">Login here</Link>.
          </p>
        </Col>
      </Row>
    </Container>
  );
  };
export default UserSignupPage;

