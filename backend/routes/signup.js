const express = require('express');
const router = express.Router();
//const bcrypt = require('bcrypt');
const User = require('../models/leave');

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const casual="5";
    const medical="5";

    //const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      //password: hashedPassword,
      password,casual,medical,
    });

    await newUser.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
