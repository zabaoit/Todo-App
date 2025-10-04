import mongoose from "mongoose";

const tasktSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
    default: "",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", tasktSchema);

export default Todo;
