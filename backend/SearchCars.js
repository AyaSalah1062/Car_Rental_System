function searchCars(connection, searchSpecs, callback) {
    let query = 'SELECT * FROM Car WHERE';
    const conditions = [];
    const queryParams = [];

    if (searchSpecs.brand) {
        conditions.push(`brand = ?`);
        queryParams.push(searchSpecs.brand);
    }
    if (searchSpecs.model) {
        conditions.push(`model = ?`);
        queryParams.push(searchSpecs.model);
    }
    if (searchSpecs.year) {
        conditions.push(`year = ?`);
        queryParams.push(searchSpecs.year);
    }
    if (searchSpecs.color) {
        conditions.push(`color = ?`);
        queryParams.push(searchSpecs.color);
    }
    if (searchSpecs.car_seats) {
        conditions.push(`car_seats = ?`);
        queryParams.push(searchSpecs.car_seats);
    }
    if (searchSpecs.transmission) {
        conditions.push(`transmission = ?`);
        queryParams.push(searchSpecs.transmission);
    }

    if (conditions.length > 0) {
        query += ' ' + conditions.join(' AND ');
    } else {
        // If no conditions were provided, fetch all cars
        query = 'SELECT * FROM Car';
    }

    connection.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        callback(null, results);
    });
}

module.exports = {
    searchCars
};
