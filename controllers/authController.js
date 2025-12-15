// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const generateToken = require('../utils/jwt');

// // SIGNUP
// const signup = async (req, res) => {
//   try {
//     const data = req.body;
//     console.log(data)
//     // console.log(email)
//     // console.log(password)

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword
//     });

//     const token = generateToken(user._id);

//     res.cookie('jwt', token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: 'strict',
//       maxAge: 24 * 60 * 60 * 1000
//     });

//     res.status(201).json({ 
//       message: 'Signup successful',
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       },
//       token
//     });
//   } catch (error) {
//     console.error('SIGNUP ERROR:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // LOGIN
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const token = generateToken(user._id);

//     res.cookie('jwt', token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: 'strict',
//       maxAge: 24 * 60 * 60 * 1000
//     });

//     res.json({ 
//       message: 'Login successful',
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       },
//       token
//     });
//   } catch (error) {
//     console.error('LOGIN ERROR:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // ME
// const me = async (req, res) => {
//   res.json(req.user);
// };

// // LOGOUT
// const logout = async (req, res) => {
//   res.clearCookie('jwt');
//   res.json({ message: 'Logged out' });
// };

// // 🔴 EXPORT MUST BE LIKE THIS
// module.exports = {
//   signup,
//   login,
//   me,
//   logout
// };
