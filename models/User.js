const mongoose = require('mongoose');
// Gets mongoose.Schema
const { Schema } = mongoose;

const userSchema = new Schema({

	googleID: String

});

mongoose.model('users', userSchema);