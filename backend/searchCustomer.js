function searchCustomers(connection, searchSpecs, callback) {
    let query = 'SELECT * FROM Customer WHERE';
    const conditions = [];
    const queryParams = [];

    if (searchSpecs.first_name && typeof searchSpecs.first_name === 'string') {
        conditions.push(`first_name = ?`);
        queryParams.push(searchSpecs.first_name);
    }
    if (searchSpecs.last_name && typeof searchSpecs.last_name === 'string') {
        conditions.push(`last_name = ?`);
        queryParams.push(searchSpecs.last_name);
    }
    if (searchSpecs.birthdate) {
        conditions.push(`birthdate = ?`);
        queryParams.push(searchSpecs.birthdate);
    }
    if (searchSpecs.phone && typeof searchSpecs.phone === 'string') {
        conditions.push(`phone = ?`);
        queryParams.push(searchSpecs.phone);
    }
    if (searchSpecs.email && typeof searchSpecs.email === 'string' && isValidEmail(searchSpecs.email)) {
        conditions.push(`email = ?`);
        queryParams.push(searchSpecs.email);
    }
    if (searchSpecs.sex && typeof searchSpecs.sex === 'string') {
        conditions.push(`sex = ?`);
        queryParams.push(searchSpecs.sex);
    }

    if (conditions.length > 0) {
        query += ' ' + conditions.join(' AND ');
    } else {
        // If no valid conditions were provided, fetch all customers
        query = 'SELECT * FROM Customer';
    }

    connection.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
            return;
        }

        if (results.length === 0) {
            // No customer found with the given specifications
            callback(null, "No customer found with these specifications.");
            return;
        }

        callback(null, results);
    });
}

function isValidEmail(email) {
    // Basic email validation using a regular expression
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = {
    searchCustomers
};
