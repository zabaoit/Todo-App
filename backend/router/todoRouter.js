import express from "express";
import {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  toggleCompleted,
} from "../controller/todoController.js";

const router = express.Router();

router.route("/").get(getAllTodos).post(createTodo);
router.route("/:id").get(getTodoById).put(updateTodo).delete(deleteTodo);
router.route("/:id/toggle").patch(toggleCompleted);
export default router;
