// //Setting Up Dependencies:
// const express = require('express');
// const router = express.Router();
// const mysql = require('mysql');
// const bcrypt = require('bcrypt');

// // Handle sign-up POST request
// router.post('/', async (req, res) => {
//     // Create MySQL connection
//     const connection = mysql.createConnection({
//         host: 'localhost',
//         port: 3306,
//         user: 'root',
//         password: '',
//         database: 'car_rental_system'
//     });

//     try {
//         // Connect to MySQL
//         connection.connect();

//         const {
//             ssn,
//             firstName,
//             lastName,
//             birthdate,
//             phone,
//             email,
//             password,
//             sex,
//             address
//         } = req.body;

//         // // Basic validation
//         // if (!ssn || !firstName || !lastName || !birthdate || !phone || !email || !password || !sex || !address) {
//         //     return res.status(400).json({
//         //         error: 'All fields are required'
//         //     });
//         // }

//         // // Validate email format
//         // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         // if (!emailRegex.test(email)) {
//         //     return res.status(400).json({
//         //         error: 'Invalid email format'
//         //     });
//         // }

//         // // Validate password criteria (e.g., minimum length)
//         // if (password.length < 6) {
//         //     return res.status(400).json({
//         //         error: 'Password must be at least 6 characters long'
//         //     });
//         // }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10

//         // Check if the email already exists in the database
//         const emailCheckQuery = 'SELECT * FROM Customer WHERE email = ?';
//         const emailCheckResult = await queryDatabase(connection, emailCheckQuery, [email]);

//         if (emailCheckResult.length > 0) {
//             // Email already exists
//             console.error('Email already exists:', email);
//             return res.status(409).json({
//                 error: 'Email already exists'
//             });
//         }

//         // Insert new user into the database
//         const insertUserQuery = `
//             INSERT INTO Customer (ssn, firstName, lastName, birthdate, phone, email, password_hash, sex, address)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;
//         await queryDatabase(connection, insertUserQuery, [ssn, firstName, lastName, birthdate, phone, email, hashedPassword, sex, address]);

//         // Return success message
//         res.status(201).json({
//             message: 'User registered successfully'
//         });
//     } catch (error) {
//         // Log the error on the server side
//         console.error('Error during signup:', error);

//         // Return a JSON response with a user-friendly error message
//         res.status(500).json({
//             error: 'Internal server error. Please try again later.'
//             // message: error.message, // Log the error message for debugging

//         });
//     } finally {
//         // Close the MySQL connection
//         connection.end();
//     }
// });

// // // Helper function to query the database
// // function queryDatabase(connection, sql, values) {
// //     return new Promise((resolve, reject) => {
// //         connection.query(sql, values, (err, results) => {
// //             if (err) {
// //                 console.error('Database query error:', err);
// //                 reject(err);
// //             } else {
// //                 resolve(results);
// //             }
// //         });
// //     });
// // }

// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const mysql = require('mysql');
// const bcrypt = require('bcrypt');

// // Create MySQL connection
// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '',
//     database: 'car_rental_system'
// });

// // Handle sign-up POST request
// router.post('/', async (req, res) => {
//     const { ssn, firstName, lastName, birthdate, phone, email, password, sex, address } = req.body;

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10

//     // Check if the email already exists in the database
//     connection.query('SELECT * FROM Customer WHERE email = ?', [email], async (err, results) => {
//         if (err) {
//             console.error('Error checking email:', err);
//             res.status(500).json({ error: 'Internal server error' });
//             return;
//         }

//         if (results.length > 0) {
//             res.status(409).json({ error: 'Email already exists' });
//             return;
//         }

//         // Insert new user into the database
//         connection.query(
//             'INSERT INTO Customer (ssn, first_name, last_name, birthdate, phone, email, password_hash, sex, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
//             [ssn, firstName, lastName, birthdate, phone, email, hashedPassword, sex, address],
//             (err, result) => {
//                 if (err) {
//                     console.error('Error inserting user:', err);
//                     res.status(500).json({ error: 'Internal server error' });
//                     return;
//                 }
//                 res.status(201).json({ message: 'User registered successfully' });
//             }
//         );
//     });
// });

// module.exports = router;
// module.exports = router;
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'car_rental_system'
});

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Handle sign-up POST request
router.post('/', async (req, res) => {
    const { ssn, firstName, lastName, birthdate, phone, email, password, sex, address } = req.body;

    // Validate input data
    if (!ssn || !firstName || !lastName || !birthdate || !phone || !email || !password || !sex || !address) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10

    // Check if the email already exists in the database
    connection.query('SELECT * FROM Customer WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length > 0) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        // Insert new user into the database
        connection.query(
            'INSERT INTO Customer (ssn, first_name, last_name, birthdate, phone, email, password_hash, sex, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [ssn, firstName, lastName, birthdate, phone, email, hashedPassword, sex, address],
            (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                return res.status(201).json({ message: 'User registered successfully' });
            }
        );
    });
});

module.exports = router;

