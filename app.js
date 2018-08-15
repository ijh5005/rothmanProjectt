const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

const auth = require('./routes/api/auth');
const user = require('./routes/api/user');
app.use('/auth', auth);
app.use('/user', user);

//db config
const db = require('./config/appKeys').mlaburl;
//connect to db
mongoose.connect(db)
        .then(() => console.log('mongoosebd connected'))
        .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
