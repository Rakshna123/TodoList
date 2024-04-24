var express = require("express");
var cors = require("cors");
var router = require("./router.js");
var app = express();
require('./Modal/db.js');
app.use(express.json());
app.use(cors());
app.use("/api/tasks", router);
app.listen('8000' , err =>{
  if (err) console.log(err);
  console.log("Server starting at port number : 8000 ");
})
// var cors = require("cors");
// var mongoose = require("mongoose");
// app.use(cors());
// app.use(express.json());


// mongoose.connect("mongodb://localhost:27017/Todolist")
//   .then(success => {
//     console.log("Connected to MongoDB");
//     app.listen(8000, () => {
//       console.log("Server is running");
//     });
//   })
//   .catch(error => {
//     console.error("Error connecting to MongoDB:", error);
//   });