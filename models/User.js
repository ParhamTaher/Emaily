const mongoose = require('mongoose');
// Gets mongoose.Schema
const { Schema } = mongoose;

// Check mongoose docs
const userSchema = new Schema({

	googleID: String,
	credits: { type: Number, default: 0 }

});

mongoose.model('users', userSchema);