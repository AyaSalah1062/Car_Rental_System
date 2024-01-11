const bcrypt = require('bcrypt');

async function validateAdminLogin(connection, email, password, callback) {
    try {
        // Execute query to get admin data based on email
        connection.query('SELECT * FROM Admin WHERE admin_email = ?', [email], async (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                return callback(err, null);
            }

            // Check if any matching admin found
            if (results.length === 0) {
                // No admin found with provided email
                console.log('Admin Login failed: Invalid email');
                return callback(null, { authenticated: false, error: 'Invalid email' });
            }

            // Admin found, check password
            const admin = results[0];
            const storedHashedPassword = admin.admin_password;

            // Compare hashed password with provided password
            // const match = await bcrypt.compare(password, storedHashedPassword);

            if (password === storedHashedPassword) {
                console.log('Admin Login successful');
                const adminData = {
                    authenticated: true,
                    admin: admin,
                };
                return callback(null, adminData);
            } else {
                console.log('Admin Login failed: Invalid password');
                return callback(null, { authenticated: false, error: 'Invalid password' });
            }
        });
    } catch (error) {
        console.error('Unexpected error during admin login:', error);
        return callback(error, null);
    }
}

module.exports = {
    validateAdminLogin,
};
