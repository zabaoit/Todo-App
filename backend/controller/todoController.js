import Todo from "../models/todoModels.js";

const getAllTodos = async (req, res) => {
  try {
    const task = await Todo.find().sort({ createAt: -1 });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Todo.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const tasks = new Todo({
      title: title,
      description: description,
    });

    const savedTask = await tasks.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const { id } = req.params;

    const updateTask = await Todo.findByIdAndUpdate(
      id,
      {
        title,
        description,
        completed,
        updateAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!updateTask) {
      return res.status(404).json({ message: "Task not found!" });
    }

    res.json(updateTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Todo.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }

    res.json({ message: "Task deleted successfully!", task: task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const toggleCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Todo.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }

    task.completed = !task.completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export { getAllTodos, createTodo, getTodoById, updateTodo, deleteTodo, toggleCompleted };
