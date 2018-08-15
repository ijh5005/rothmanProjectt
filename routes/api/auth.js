const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../../config/appKeys').secretOrKey;
const passport = require('passport');

//load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//used to hash password
const bcrypt = require('bcryptjs')

const User = require('../../models/User');

// @route post /auth/register
// register user
router.post('/register', (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //check validation
  if(!isValid){
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email })
      .then(user => {
        if(user){
          errors.email = 'email already exist'
          return res.status(400).json(errors)
        }

        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          city: req.body.city
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser['password'], salt, (err, hash) => {
            if(err){
              console.log(err);
            }
            newUser['password'] = hash;
            newUser.save()
                   .then(user => res.json(user))
                   .catch(err => console.log(err))
          })
        })
      })
})

// @route post /auth/signin
// redirect to signin page
router.post('/signin', (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //check validation
  if(!isValid){
    return res.status(400).json(errors)
  }

  const { email, username, password } = req.body;
  User.findOne({ email })
      .then(user => {
        //check for user
        if(!user){
          errors.email = 'email not found'
          return res.status(404).json(errors)
        }
        //check to correct password
        bcrypt.compare(password, user.password)
              .then(isMatch => {
                if(isMatch){
                  const payload = {
                    id: user.id,
                    username : user.username,
                    email : user.email,
                    city: user.city
                  }
                  //sign jwt
                  jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
                    res.json({ token: `Bearer ${token}` });
                  })
                } else {
                  errors.password = 'password incorrect';
                  return res.status(404).json(errors);
                }
              })
      })
})

// @route get /auth/current
// return current user (private route)
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json(req.user);
})

module.exports = router;
