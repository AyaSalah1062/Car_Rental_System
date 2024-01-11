const addCar = (connection, carData, callback) => {
    // Basic validations for required fields
    if (!carData.plate_id || !carData.brand || !carData.model || !carData.year || !carData.color || !carData.price || !carData.status) {
        const error = new Error('Missing required car data');
        callback(error, null);
        return;
    }
    // Check if the plate_id already exists in the Car table
    const checkPlateIdQuery = 'SELECT COUNT(*) AS count FROM Car WHERE plate_id = ?';
    connection.query(checkPlateIdQuery, carData.plate_id, (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Error checking plate_id:', checkErr);
            callback(checkErr, null);
            return;
        }

        const plateIdCount = checkResults[0].count;
        if (plateIdCount > 0) {
            const error = new Error('Plate ID already exists');
            callback(error, null);
            return;
        }

        // If plate_id does not exist, proceed with insertion
        const insertQuery = 'INSERT INTO Car SET ?';
        connection.query(insertQuery, carData, (insertErr, results) => {
            if (insertErr) {
                console.error('Error adding car:', insertErr);
                callback(insertErr, null);
                return;
            }
            console.log('Car added successfully:', results);
            callback(null, results);
        });
    });
};

module.exports = {
    addCar
};
