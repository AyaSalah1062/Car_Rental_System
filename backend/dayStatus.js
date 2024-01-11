function getDayStatus(connection, specificDate, callback) {
    const query = `
    SELECT Car.plate_id, Car.brand, Car.model, 
      CASE 
        WHEN R.start_date <= ? AND R.end_date >= ? THEN 'rented' 
        ELSE 'active' 
      END AS status
    FROM Car
    LEFT JOIN Reservation R ON Car.plate_id = R.car_plate_id
    WHERE (R.start_date <= ? AND R.end_date >= ?) OR R.reservation_number IS NULL
  `;

    connection.query(query, [specificDate, specificDate, specificDate, specificDate], (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }

        // Add a validation to handle empty results
        if (results.length === 0) {
            const error = new Error('No car status found for the specific date');
            callback(error, null);
            return;
        }

        callback(null, results);
    });
}

module.exports = {
    getDayStatus
};
