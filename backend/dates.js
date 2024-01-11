function checkCarAvailability(connection, carPlateId, pickupDate, returnDate, callback) {
    const checkQuery = `
      SELECT *
      FROM Reservation
      WHERE car_plate_id = ?
      AND NOT (start_date >= ? OR end_date <= ?)
    `;
  
    connection.query(
      checkQuery,
      [carPlateId, returnDate, pickupDate],
      (err, result) => {
        if (err) {
          // Ensure callback is a function before calling it
          if (typeof callback === 'function') {
            callback(err, null);
          }
          return;
        }
  
        if (result.length === 0) {
          // Car is available for the specified dates
          if (typeof callback === 'function') {
            callback(null, {
              availableMessage: 'Car is available for the specified dates',
              pickupDate: pickupDate,
              returnDate: returnDate,
            });
          }
        } else {
          // Car is not available for the specified dates
          const conflictingReservations = result.map((reservation) => ({
            id: reservation.id,
            startDate: reservation.start_date,
            endDate: reservation.end_date,
          }));
  
          if (typeof callback === 'function') {
            callback({
              error: 'Car is not available for the specified dates',
              conflictingReservations: conflictingReservations,
            }, null);
          }
        }
      }
    );
  }
  
  module.exports = {
    checkCarAvailability,
  };
  