import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/api/vi/status", (req, res) => {
  res.status(200).json({ status: "Api  is running ..." });
});

export default app;
