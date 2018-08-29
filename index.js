const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys.js');
require('./models/User.js');
require('./services/passport.js');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());

app.use(
	cookieSession({
		// expire in 30 days
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes.js')(app);
require('./routes/billingRoutes.js')(app);

// process env port is the port the host will assign
const PORT = process.env.PORT || 5000;
app.listen(PORT);