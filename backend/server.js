import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config({ path: "./.config.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

// MongoDB connection
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection  successful");
  })
  .catch(err => {
    console.log("DB connection error: ", err.message);
  });

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
