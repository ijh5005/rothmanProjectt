const express = require('express');
const router = express.Router();
const passport = require('passport');

//load input validation
const validateRegisterInput = require('../../validation/register');

const User = require('../../models/User');

// @route update /user/update
// update current user
router.post('/update', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const profileFields = {};
  if(req.body.username)  profileFields.username  = req.body.username;
  if(req.body.email)     profileFields.email     = req.body.email;
  if(req.body.passpord)  profileFields.passpord  = req.body.passpord;

  User.findOneAndUpdate(
               { user: req.id },
               { $set: profileFields },
               { new: true }
             ).then(profile => res.json(profile));
})

// @route get /user/delete
// return current user (private route)
router.delete('/delete', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  User.findOneAndDelete({ id: req.id })
      .then(user => console.log(user));
  res.json({ user: 'user deleted' })
})

module.exports = router;
