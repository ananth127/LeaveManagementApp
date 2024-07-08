const express = require('express');
const router = express.Router();
//const bcrypt = require('bcrypt');

const User = require('../models/leave'); // Assuming you have a User model

router.post('/logina', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username });
    
  

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    //const isPasswordValid = await bcrypt.compare(password, user.password);
    

    //if (!isPasswordValid) {
      const userId = user._id;
      
      const medical=user.medical;
      const casual=user.casual;const username1=user.username;
      
      if(password!=user.password){
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Handle successful login
    res.status(200).json({ message: 'Login successful',userId,casual,medical,username1});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
