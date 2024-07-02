const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "El titulo es requerido"],
    },
    description: {
      type: String,
      required: [true, "La descripción es requerida"],
    },
    priority: {
      type: String,
      enum: ["BAJA", "MEDIA", "ALTA"],
      default: "MEDIA",
    },
    // Relación con el modelo de users
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "El usuario es requerido"],
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
