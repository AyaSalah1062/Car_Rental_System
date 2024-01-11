function getCarPeriodReservations(connection, plateId, startDate, endDate, callback) {
    // Check if the plateId exists in the Car table
    const checkPlateIdQuery = 'SELECT COUNT(*) AS count FROM Car WHERE plate_id = ?';
    connection.query(checkPlateIdQuery, plateId, (checkPlateIdErr, checkPlateIdResults) => {
        if (checkPlateIdErr) {
            callback(checkPlateIdErr, null);
            return;
        }

        const plateIdCount = checkPlateIdResults[0].count;
        if (plateIdCount === 0) {
            const error = new Error('Plate ID does not exist');
            callback(error, null);
            return;
        }

        // Check if the car is not rented within the specified period
        const query = `
      SELECT 
        R.reservation_number,
        R.customer_ssn,
        R.car_plate_id,
        R.start_date,
        R.end_date,
        R.reservation_price,
        R.payment_status,
        R.payment_status,
        Car.brand AS car_brand,
        Car.model AS car_model,
        Car.year AS car_year,
        Car.color,
        Car.office_id
      FROM Reservation R
      JOIN Customer C ON R.customer_ssn = C.ssn
      JOIN Car ON R.car_plate_id = Car.plate_id
      WHERE R.car_plate_id = ? AND R.start_date >= ? AND R.end_date <= ?
    `;

        connection.query(query, [plateId, startDate, endDate], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }

            if (results.length === 0) {
                const noRentError = new Error('Car is not reserved within the specified period');
                callback(noRentError, null);
                return;
            }

            callback(null, results);
        });
    });
}

module.exports = {
    getCarPeriodReservations
};
