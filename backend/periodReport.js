// Function to handle fetching reservations within a specified period
function fetchReservationsByPeriod(connection, startDate, endDate, callback) {
  const query = `
    SELECT 
      R.reservation_number,
      R.customer_ssn,
      R.car_plate_id,
      R.start_date,
      R.end_date,
      R.reservation_price,
      R.payment_status,
      C.first_name AS customer_first_name,
      C.last_name AS customer_last_name,
      C.email AS customer_email,
      C.phone,
      Car.brand AS car_brand,
      Car.model AS car_model,
      Car.year AS car_year,
      Car.color,
      Car.office_id
    FROM Reservation R
    JOIN Customer C ON R.customer_ssn = C.ssn
    JOIN Car ON R.car_plate_id = Car.plate_id
    WHERE R.start_date >= ? AND R.end_date <= ?;
  `;

  connection.query(query, [startDate, endDate], (err, results) => {
    if (err) {
      console.error('Error fetching reservations:', err);
      callback(err, null);
      return;
    }
    callback(null, results);
  });
}

module.exports = {
  fetchReservationsByPeriod
};