const express = require("express");

//routes
const authRouter = require("./auth.router");
const taskRouter = require("./task.router");

function routes(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/auth", authRouter);
  router.use("/tasks", taskRouter);
}

module.exports = routes;
