const mongoose = require("mongoose");

const emailSequenceSchema = new mongoose.Schema({
    email: { type: String, required: true},
    subject: { type: String, required: true},
    body: { type: String, required: true},
    delay: { type: Number, required: true},
    createAt: { type: Date, default: Date.now},
})

module.exports = mongoose.model("EmailSequence", emailSequenceSchema);