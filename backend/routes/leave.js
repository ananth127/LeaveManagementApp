const express = require('express');
const router = express.Router();
const User = require('../models/leave');

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { leaveType, leaveDays } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (leaveType === "medical") {
      const medical = user.medical - leaveDays;
      if (medical >= 0) {
        user.medical = medical;
      } else {
        return res.status(400).json({ message: 'Medical leave limit exceeded', casual: user.casual, medical: user.medical });
      }
    } else if (leaveType === "casual") {
      const casual = user.casual - leaveDays;
      if (casual >= 0) {
        user.casual = casual;
      } else {
        return res.status(400).json({ message: 'Casual leave limit exceeded', casual: user.casual, medical: user.medical });
      }
    }

    const updatedUser = await user.save();
    res.status(200).json({ message: 'Update successful', user: updatedUser, casual: updatedUser.casual, medical: updatedUser.medical });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
