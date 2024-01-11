// Function to retrieve customer reservations based on email and return the customer's SSN
function getCustomerReservations(connection, email, callback) {
    // Retrieve the customer's SSN based on the email
    const ssnQuery = 'SELECT ssn FROM Customer WHERE email = ?';
  
    connection.query(ssnQuery, [email], (err, ssnResult) => {
      if (err) {
        console.error('Error retrieving customer SSN:', err);
        callback(err, null);
        return;
      }
  
      if (ssnResult.length === 0) {
        // Customer not found with the provided email
        callback(null, { reservations: [] });
        return;
      }
  
      const customerSSN = ssnResult[0].ssn;
  
      // Retrieve reservations for the customer using their SSN
      const reservationsQuery = 'SELECT * FROM Reservation WHERE customer_ssn = ?';
      connection.query(reservationsQuery, [customerSSN], (err, reservations) => {
        if (err) {
          console.error('Error retrieving customer reservations:', err);
          callback(err, null);
          return;
        }
  
        // Return reservations for the customer (without SSN)
        callback(null, { reservations });
      });
    });
  }
  // Export the function
module.exports = {
    getCustomerReservations,
  };
  