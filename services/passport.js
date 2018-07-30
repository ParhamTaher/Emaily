const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {

	// user.id <==> "_id": { "$oid".....
	done(null, user.id);

});

passport.deserializeUser((id, done) => {

	User.findById(id).then((user) => {

		done(null, user);

	});

});

passport.use(new GoogleStrategy({

	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback'

}, (accessToken, refreshToken, profile, done) => {

	// Async action
	User.findOne({ googleID: profile.id }).then((existingUser) => {

		if (existingUser) {

			done(null, existingUser);

		} else {

			new User({ googleID: profile.id }).save().then((user) => {

				done(null, user);

			});

		}

	});	

}));