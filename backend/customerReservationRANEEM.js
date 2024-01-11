function getCustomerReservation(connection, customerSSN, callback) {
    // Check if the customerSSN exists in the Customer table
    const checkCustomerSSNQuery = 'SELECT COUNT(*) AS count FROM Customer WHERE ssn = ?';
    connection.query(checkCustomerSSNQuery, customerSSN, (checkCustomerSSNErr, checkCustomerSSNResults) => {
        if (checkCustomerSSNErr) {
            callback(checkCustomerSSNErr, null);
            return;
        }

        const customerSSNCount = checkCustomerSSNResults[0].count;
        if (customerSSNCount === 0) {
            const error = new Error('Customer SSN does not exist');
            callback(error, null);
            return;
        }

        // Retrieve customer reservations if the customer SSN exists
        const query = `
      SELECT 
        R.reservation_number,
        R.start_date,
        R.end_date,
        R.reservation_price,
        R.customer_ssn,
        R.car_plate_id,
        Car.brand AS car_brand,
        Car.model AS car_model,
        Car.year AS car_year,
        C.first_name AS customer_first_name,
        C.last_name AS customer_last_name,
        C.email AS customer_email,
        C.phone
      FROM Reservation R
      JOIN Customer C ON R.customer_ssn = C.ssn
      JOIN Car ON R.car_plate_id = Car.plate_id
      WHERE R.customer_ssn = ?;
    `;

        connection.query(query, [customerSSN], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    });
}

module.exports = {
    getCustomerReservation
};
