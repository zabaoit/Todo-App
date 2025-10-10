import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { deleteUser, getUser, getUserById } from "../controller/userController.js";

const router = express.Router();

router.use(verifyToken);

router.route("/").get(getUser);
router.route("/:id").get(getUserById).delete(deleteUser);

export default router;
