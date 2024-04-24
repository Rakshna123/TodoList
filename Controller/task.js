const Task = require('../Modal/taskSchema');

const taskController = {
  async createTask(req, res) {
    try {
      const { title, description, status, userId } = req.body;
      const task = new Task({ title, description, status, user: userId });
      await task.save();
      res.status(201).send(task);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async getTasks(req, res) {
    try {
      const tasks = await Task.find();
      res.send(tasks);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getTask(req, res) {
    try {
      const taskId = req.params.id;
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).send({ message: 'Task not found' });
      }
      res.send(task);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async updateTask(req, res) {
    try {
      const taskId = req.params.id;
      const updates = req.body;
      const task = await Task.findByIdAndUpdate(taskId, updates, { new: true });
      if (!task) {
        return res.status(404).send({ message: 'Task not found' });
      }
      res.send(task);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async deleteTask(req, res) {
    try {
      const taskId = req.params.id;
      const task = await Task.findByIdAndDelete(taskId);
      if (!task) {
        return res.status(404).send({ message: 'Task not found' });
      }
      res.send({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).send(error);
    }
  }
};

module.exports = taskController;
