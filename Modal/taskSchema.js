const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    isComplete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('task', taskSchema);
