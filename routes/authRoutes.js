const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

/* ===================== SIGNUP ===================== */
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword
    });

    // JWT token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    const isProd = process.env.NODE_ENV === 'production';
    // store token in cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true, // true in production
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ===================== SIGNIN ===================== */
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
     console.log(token);
    // save token in cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true, // true in production
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token

    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ===================== LOGOUT ===================== */
router.post('/logout', (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
