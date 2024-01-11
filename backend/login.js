const bcrypt = require('bcrypt');

async function validateLogin(connection, email, password, callback) {
    try {
        // // Validate email format
        //     if (!isValidEmail(email)) {
        //             console.log('Login failed: Invalid email format');
        //             return callback(null, { authenticated: false, error: 'Invalid email format' });
        //     }
        // Execute query to get user data based on email
        connection.query('SELECT * FROM Customer WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                return callback(err, null);
            }

            // Check if any matching user found
            if (results.length === 0) {
                // No user found with provided email
                console.log('Login failed: Invalid email');
                return callback(null, { authenticated: false, error: 'Invalid email' });
            }

            // User found, check password
            const user = results[0];
            const storedHashedPassword = user.password_hash;

            // Debugging: Log stored hashed password and input password
            console.log('Stored Hashed Password:', storedHashedPassword);
            console.log('Input Password:', password);


            // Compare hashed password with provided password
            const match = await bcrypt.compare(password, storedHashedPassword);
            // const match = storedHashedPassword === password; // Simple string comparison

            // Debugging: Log bcrypt compare result
            console.log('Bcrypt Compare Result:', match);

            if (match) {
                console.log('Login successful');
                const userData = {
                    authenticated: true,
                    user: user,
                };
                return callback(null, userData);
            } else {
                console.log('Login failed: Invalid password');
                return callback(null, { authenticated: false, error: 'Invalid password' });
            }
        });
    } catch (error) {
        console.error('Unexpected error during login:', error);
        return callback(error, null);
    }
}

module.exports = {
    validateLogin,
};
