const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/Todolist' , {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch(err => {
    console.error("Error in DB connection:", err);
});

module.exports = mongoose.connection;
