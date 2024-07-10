const express = require('express');
const router = express.Router();
//const bcrypt = require('bcrypt');
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



router.put('/', async (req, res) => {
  try {
    const { id, leaveType, leaveDays } = req.body;
    const existingUser = await User.findOne({ id });
    const user = await User.findById(id);
    if (existingUser) {
      return res.status(409).json({ message: 'User found' });
    }
    if(leaveType=="medical"){
      const medical= (user.medical)-(leaveDays);
      if( medical>=0 && user.medical > medical ){
      updatedUser= await User.findByIdAndUpdate(
        id,
        { medical},
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'Update successful', user: updatedUser,casual:updatedUser.casual,medical:updatedUser.medical });
      }
      else{
        res.json({ message: 'limit exeeded',casual:updatedUser.casual,medical:updatedUser.medical});

      }
      
    }
    else if(leaveType=="casual"){
      const casual= (user.casual)-(leaveDays);
      if(casual>=0 && user.casual > casual ){
        updatedUser= await User.findByIdAndUpdate(
          id,
          { casual},
          { new: true }
        );
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Update successful', user: updatedUser,casual:updatedUser.casual,medical:updatedUser.medical});
        
        // console.log(json({ message: 'Update successful', user: updatedUser,casual:updatedUser.casual,medical:updatedUser.medical}));
      }
      else{
        res.json({ message: 'limit exeeded' ,casual:updatedUser.casual,medical:updatedUser.medical});
      }
      
    }
    

    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
