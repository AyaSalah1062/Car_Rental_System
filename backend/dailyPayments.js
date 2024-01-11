function getDailyPayments(connection, startDate, endDate, callback) {
    const query = `
    SELECT DATE(reservation_date) AS payment_date, SUM(reservation_price) AS total_daily_payment
    FROM reservation
    WHERE reservation_date BETWEEN ? AND ?
    GROUP BY payment_date
    ORDER BY payment_date
  `;

    connection.query(query, [startDate, endDate], (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }

        // Add a validation to handle empty results
        if (results.length === 0) {
            const error = new Error('No daily payments found within the specified period');
            callback(error, null);
            return;
        }

        callback(null, { dailyPayments: results });
    });
}

module.exports = {
    getDailyPayments
};
