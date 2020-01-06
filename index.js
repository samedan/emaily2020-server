const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/UserEmaily');
require('./services/passport');

const app = express();
// db
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json()); // parse to 'req.body'
app.use(cors());

// Cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // '30' days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
