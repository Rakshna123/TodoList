var express = require("express");
var router = express.Router();
var Task = require('./Modal/taskSchema');
// const jwt = require("jsonwebtoken");
// const SECRET_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTA1MDg5MjF9.ee5tgvMUF_AjJ2oV4OrtnrI3IdHiLpX1ZEE-9H905B8";

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        res.json(savedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        res.json(deletedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// var userDetails = require("./Controller/user");
// router.post("/signup",userDetails.signup);
// router.post("/signin" , userDetails.signin);

// router.post("/generateToken", (req, res) => {
//     // Assuming req.body contains user information (e.g., username, user id, etc.)
//     const userData = req.body;

//     // Generate JWT token using the provided user data and the secret key
//     const token = jwt.sign(userData, SECRET_KEY);

//     // Send the generated token as a response
//     res.json({ token });
// });

module.exports = router;
