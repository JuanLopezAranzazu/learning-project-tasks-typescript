const express = require("express");
const taskRouter = express.Router();

//controllers
const {
  findAllTasksByUser,
  findOneTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
//middlewares
const verifyJWT = require("../middlewares/verifyJWT");
const verifyID = require("../middlewares/verifyID");

// routes
// api para obtener todas las tareas de un usuario
taskRouter.get("/user", verifyJWT, findAllTasksByUser);
// api para obtener una tarea por id
taskRouter.get("/:id", verifyJWT, verifyID, findOneTask);
// api para crear una tarea
taskRouter.post("/", verifyJWT, createTask);
// api para actualizar una tarea
taskRouter.put("/:id", verifyJWT, verifyID, updateTask);
// api para eliminar una tarea
taskRouter.delete("/:id", verifyJWT, verifyID, deleteTask);

module.exports = taskRouter;
