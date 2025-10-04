import express from "express";
import cors from "cors";
import todoRouter from "./router/todoRouter.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/v2/todos", todoRouter);

export default app;
