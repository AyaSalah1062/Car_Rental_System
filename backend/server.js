const express = require('express');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;
const mysql = require('mysql');
const { validateLogin } = require('./login');
const { validateAdminLogin } = require('./adminLogin');
const signupRouter = require('./signup');
const { searchCars } = require('./SearchCars');
const { getCustomerReservations } = require('./customerReservations');
const { checkCarAvailability } = require('./dates'); // Import checkCarAvailability function
const { saveCreditCardDetails } = require('./credit'); // Import saveCreditCardDetails function

const { addCar } = require('./addCar');
const { updateCar } = require('./updateCar');
const { deleteCar } = require('./deleteCar');
const { getCarPeriodReservations } = require('./carPeriodReservations');
const { getCustomerReservation} = require('./customerReservationRANEEM');
const { getDailyPayments } = require('./dailyPayments');
const { getDayStatus } = require('./dayStatus'); 
const periodReport = require('./periodReport');
const { searchCustomers } = require('./searchCustomer');
const { getReservationsByDate } = require('./searchReservation'); 

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'car_rental_system',
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Use sessions
app.use(
  session({
    secret: 'your-secret-key', // Change this to a strong, random secret
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json()); // Middleware to parse JSON requests

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  validateLogin(connection, email, password, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (!result.authenticated) {
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      // Store the email in the session
      req.session.email = email;

      res.status(200).json({ message: 'Login successful', user: result.user, email: email });
    }
  });
});
// Admin Login route
app.post('/admin/login', (req, res) => {
  const { email, password } = req.body;

  validateAdminLogin(connection, email, password, (err, result) => {
    if (err) {
      console.error('Error during admin login:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (!result.authenticated) {
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      req.session.adminEmail = email;
      res.status(200).json({ message: 'Admin Login successful', admin: result.admin, email: email });
    }
  });
});


// Use the signup router
app.use('/signup', signupRouter);

// Car details route (GET)
app.get('/car-details', (req, res) => {
  // Fetch car details from the Car table and send them as a response
  const query = 'SELECT * FROM Car';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching car details:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Extract relevant data from the results and send as a response
    const carDetails = {
      brands: [...new Set(results.map((row) => row.brand))],
      models: [...new Set(results.map((row) => row.model))],
      years: [...new Set(results.map((row) => row.year))],
      colors: [...new Set(results.map((row) => row.color))],
      seats: [...new Set(results.map((row) => row.car_seats))],
      transmissions: [...new Set(results.map((row) => row.transmission))],
    };

    res.status(200).json(carDetails);
  });
});

// Search cars route (POST)
app.post('/SearchCars', (req, res) => {
  const searchSpecs = req.body; // Contains specifications for searching cars

  // Search for cars based on provided specifications
  searchCars(connection, searchSpecs, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error searching cars' });
      return;
    }
    res.status(200).json({ cars: results });
  });
});


// Route for getting customer reservations
app.get('/user', (req, res) => {
  const email = req.session.email; // Retrieve the email from the session

  if (!email) {
    res.status(401).json({ error: 'User not authenticated' });
    return;
  }

  // Retrieve user reservations using their email
  getCustomerReservations(connection, email, (err, reservations) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving user reservations' });
      return;
    }

    res.status(200).json({ reservations });
  });
});

app.post('/dates', (req, res) => {
  const { car, pickupDate, returnDate } = req.body;
  req.session.savedPickupDate=pickupDate;
  req.session.savedReturnDate=returnDate;
  req.session.price=car.price;
  console.log('Request body:', req.body); // Log request body for debugging

  // Call function to check car availability
  checkCarAvailability(connection, car.plate_id, pickupDate, returnDate, (err, result) => {
    if (err) {
      console.error('Error checking car availability:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err });
      return;
    }

    console.log('Availability check result:', result); // Log the result for debugging

    if (result.availableMessage) {
      // Car is available for the specified dates
      const { pickupDate, returnDate } = result;

      // Continue with further processing or send the dates to the front-end, etc.
      res.status(200).json({ message: result.availableMessage });
    } else {
      // Car is not available for the specified dates
      res.status(400).json({ error: 'Car is not available for the specified dates' });
    }
  });
});
// Example calculateTotalPrice function
function calculateTotalPrice(pickupDate, returnDate, pricePerDay) {
  // Assuming pickupDate and returnDate are Date objects
  const numberOfDays = Math.ceil((returnDate - pickupDate) / (1000 * 60 * 60 * 24));
  
  // Calculate total price
  const totalPrice = numberOfDays * pricePerDay;

  return totalPrice;
}

module.exports = calculateTotalPrice;

// Route to save credit card details
app.post('/credit', (req, res) => {
  console.log("creditt");
  const { ssn, cardNumber, cvv } = req.body;

  // Calculate total price based on pickup and return dates and price stored in session
  const totalPrice = calculateTotalPrice(req.session.savedPickupDate, req.session.savedReturnDate, req.session.price);

  // Save credit card details to the CreditCard table
  saveCreditCardDetails(connection, ssn, cardNumber, cvv, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error saving credit card details' });
      return;
    }

    res.status(200).json({ message: 'Credit card details saved successfully' });
  });
});

// app.get('/car-price/:plate_id', (req, res) => {
//   const { plate_id } = req.params;

//   const getPriceQuery = 'SELECT price FROM Car WHERE plate_id = ?';

//   connection.query(getPriceQuery, [plate_id], (err, result) => {
//     if (err) {
//       console.error('Error fetching price per day:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//       return;
//     }

//     if (result.length === 0) {
//       // Car not found
//       res.status(404).json({ error: 'Car not found' });
//       return;
//     }

//     const pricePerDay = result[0].price;
//     res.status(200).json({ price: pricePerDay });
//   });
// });

// Routes for different functionalities
// Handle POST request to add a car
app.post('/addCar', (req, res) => {
  const carData = req.body; // Car data sent from the frontend

  // Perform insertion into the database using the imported function
  addCar(connection, carData, (err, results) => {
      if (err) {
          console.error('Error adding car:', err);
          res.status(500).send('Error adding car');
          return;
      }
      console.log('Car added successfully:', results);
      res.status(200).send('Car added successfully');
  });
});

// Handle POST request to update car status
app.post('/updateCar', (req, res) => {
  const { plateId, newStatus } = req.body; // Car plate and new status sent from the frontend

  updateCar(connection, plateId, newStatus, (err, results) => {
      if (err) {
          console.error('Error updating car status:', err);
          res.status(500).send('Error updating car status');
          return;
      }
      console.log('Car status updated successfully:', results);
      res.status(200).send(`Car status updated for plate ID: ${plateId}`);
  });
});
// Handle DELETE request to delete a car
app.delete('/deleteCar', (req, res) => {
  const { plateId } = req.body; // Car plate sent from the frontend

  deleteCar(connection, plateId, (err, result) => {
      if (err) {
          console.error('Error deleting car:', err);
          res.status(500).send('Error deleting car');
          return;
      }
      console.log('Car deleted successfully:', result);
      res.status(200).send('Car deleted successfully');
  });
});

// Handle POST request to get car reservations for a period
app.post('/carPeriodReservations', (req, res) => {
  const { plateId, startDate, endDate } = req.body; // Car plate, start date, and end date sent from the frontend

  getCarPeriodReservations(connection, plateId, startDate, endDate, (err, results) => {
      if (err) {
          console.error('Error fetching car reservations:', err);
          res.status(500).send('Error fetching car reservations');
          return;
      }
      res.json(results);
  });
});

// Handle POST request to get customer reservations
app.post('/customerReservation', (req, res) => {
  const { customerSSN } = req.body; // Customer SSN sent from the frontend

  getCustomerReservation(connection, customerSSN, (err, results) => {
      if (err) {
          console.error('Error fetching customer reservations:', err);
          res.status(500).send('Error fetching customer reservations');
          return;
      }
      res.json(results);
  });
});

// Handle POST request to get daily payments within a specific period
app.post('/dailyPayments', (req, res) => {
  const { startDate, endDate } = req.body; // Start and end dates sent from the frontend

  getDailyPayments(connection, startDate, endDate, (err, results) => {
      if (err) {
          console.error('Error fetching daily payments:', err);
          res.status(500).send('Error fetching daily payments');
          return;
      }
      res.json(results);
  });
});
// Handle POST request to get day status of cars
app.post('/dayStatus', (req, res) => {
  const { specificDate } = req.body;

  getDayStatus(connection, specificDate, (err, results) => {
      if (err) {
          res.status(500).json({ error: 'Error fetching car status' });
          return;
      }
      res.json(results);
  });
});
// Route to fetch reservations within a specified period using the periodReport function
app.post('/periodReport', (req, res) => {
  const { startDate, endDate } = req.body;

  periodReport.fetchReservationsByPeriod(connection, startDate, endDate, (err, results) => {
      if (err) {
          console.error('Error fetching reservations:', err);
          res.status(500).send('Error fetching reservations');
          return;
      }
      res.json(results);
  });
});
// Handle POST request to search for customers
app.post('/searchCustomer', (req, res) => {
  const searchSpecs = req.body; // Customer search specifications sent from the frontend

  // Perform search for customers using the imported function
  searchCustomers(connection, searchSpecs, (err, results) => {
      if (err) {
          console.error('Error searching for customers:', err);
          res.status(500).send('Error searching for customers');
          return;
      }

      if (!results || results === "No customer found with these specifications.") {
          // No customer found with the given specifications
          res.status(404).send("No customer found with these specifications.");
          return;
      }

      res.json(results);
  });
});

// Handle POST request to get reservations by date
app.post('/reservationsByDate', (req, res) => {
  const { date } = req.body; // Date sent from the frontend

  // Perform retrieval of reservations by date using the imported function
  getReservationsByDate(connection, date, (err, results) => {
      if (err) {
          console.error('Error fetching reservations by date:', err);
          res.status(500).send('Error fetching reservations by date');
          return;
      }

      res.json(results);
  });
});
// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Car Rental System');
});

// Listen on specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = {
  connection,
};
