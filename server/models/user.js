const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: { type: String, required: true },
    ownerImg: [String]
}, { timestamps: true });

const userModel = mongoose.model('users', userSchema);

module.exports = { userModel };
