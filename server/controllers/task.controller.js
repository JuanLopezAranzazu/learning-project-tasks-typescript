// models
const Task = require("../models/task.model");

// Controlador para obtener todas las tareas de un usuario
const findAllTasksByUser = async (req, res) => {
  try {
    const { userId } = req;
    const tasks = await Task.find({ user: userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener una tarea por su id
const findOneTask = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    const foundTask = await Task.findById(id);
    if (!foundTask) {
      return res
        .status(404)
        .json({ message: `La tarea con id ${id} no se encuentra` });
    }
    res.status(200).json(foundTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para crear una tarea
const createTask = async (req, res) => {
  try {
    const { userId, body } = req;
    const newTask = new Task({
      ...body,
      user: userId,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "MongoError") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Controlador para actualizar una tarea
const updateTask = async (req, res) => {
  try {
    const { params, body } = req;
    const { id } = params;
    const foundTask = await Task.findById(id);
    if (!foundTask) {
      return res
        .status(404)
        .json({ message: `La tarea con id ${id} no se encuentra` });
    }
    const taskUpdated = await Task.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );
    res.status(200).json(taskUpdated);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "MongoError") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Controlador para eliminar una tarea
const deleteTask = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    const foundTask = await Task.findById(id);
    if (!foundTask) {
      res
        .status(404)
        .json({ message: `La tarea con id ${id} no se encuentra` });
      return;
    }
    await Task.deleteOne({ _id: id });
    res.status(200).json({ message: "Tarea eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  findAllTasksByUser,
  findOneTask,
  createTask,
  updateTask,
  deleteTask,
};
