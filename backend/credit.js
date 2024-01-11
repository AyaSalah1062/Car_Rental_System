function saveCreditCardDetails(connection, ssn, cardNumber, cvv, callback) {
    const cardNumberPattern = /^\d{16}$/;
    const cvvPattern = /^\d{3,4}$/;

    if (!cardNumberPattern.test(cardNumber)) {
        return callback('Invalid credit card number format or length');
    }

    if (!cvvPattern.test(cvv)) {
        return callback('Invalid CVV format or length');
    }

    const checkQuery = 'SELECT * FROM CreditCard WHERE ssn = ? AND card_number = ?';
    connection.query(checkQuery, [ssn, cardNumber], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Error checking existing record:', checkErr);
            return callback('Error checking existing record');
        }

        if (checkResult.length > 0) {
            return callback('Credit card details already exist for this SSN and card number');
        }

        const insertQuery = 'INSERT INTO CreditCard (ssn, card_number, cvv) VALUES (?, ?, ?)';
        connection.query(insertQuery, [ssn, cardNumber, cvv], (insertErr, insertResult) => {
            if (insertErr) {
                console.error('Error saving credit card details:', insertErr);
                return callback('Error saving credit card details');
            }

            // Success: Invoke callback with null for error and a success message
            return callback(null, 'Credit card details saved successfully');
        });
    });
}

module.exports = {
    saveCreditCardDetails
};
