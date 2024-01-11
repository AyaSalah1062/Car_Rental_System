function deleteCar(connection, plateId, callback) {
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

        // If plateId exists, proceed with deleting the car
        const deleteQuery = 'DELETE FROM Car WHERE plate_id = ?';
        connection.query(deleteQuery, plateId, (err, result) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, result);
        });
    });
}

module.exports = {
    deleteCar
};
