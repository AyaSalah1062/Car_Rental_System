function getReservationsByDate(connection, date, callback) {
    const query = `
        SELECT * 
        FROM Reservation 
        WHERE reservation_date = ?
    `;

    connection.query(query, [date], (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }

        if (!results.length) {
            callback(null, { message: 'No reservations found for the provided date.' });
            return;
        }

        callback(null, results);
    });
}

module.exports = {
    getReservationsByDate,
};
