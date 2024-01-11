// // server/index.js
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const { getUserByEmail, addUser } = require('./auth');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(bodyParser.json());

// // ... (other routes)

// // User Signup
// app.post('/user/signup', (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   if (getUserByEmail(email, 'user')) {
//     return res.status(400).json({ message: 'User already exists' });
//   }

//   addUser(email, password, 'user');
//   res.json({ message: 'User signup successful' });
// });

// // User Login
// app.post('/user/login', (req, res) => {
//   const { email, password } = req.body;
//   const user = getUserByEmail(email, 'user');

//   if (!user || user.password !== password) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }

//   res.json({ message: 'User login successful' });
// });

// // ... (other routes)

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
