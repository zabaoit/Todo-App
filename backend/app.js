import express from "express";
import cors from "cors";
import todoRouter from "./router/todoRouter.js";
import authRouter from "./router/auth.router.js";
import userRouter from "./router/user.Router.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/v2/todos", todoRouter);
app.use("/api/v2/user", authRouter);
app.use("/api/v2/user", userRouter);
export default app;
