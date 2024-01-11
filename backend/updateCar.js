// UpdateCarStatusForm.js (Backend - Node.js)
async function updateCar (connection, plateId, newStatus, callback) {
    // Check if the plateId exists in the Car table
    const checkPlateIdQuery = 'SELECT COUNT(*) AS count FROM Car WHERE plate_id = ?';
    console.log('Check Plate ID Query:', checkPlateIdQuery);
    console.log('Plate ID:', plateId);    connection.query(checkPlateIdQuery, [plateId], (checkPlateIdErr, checkPlateIdResults) => {
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
  
      // If plateId exists, proceed with updating car status
      const updateQuery = 'UPDATE Car SET status = ? WHERE plate_id = ?';
      connection.query(updateQuery, [newStatus, plateId], (err, results) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, results);
      });
    });
  };
  
  module.exports = {
    updateCar
  };
  