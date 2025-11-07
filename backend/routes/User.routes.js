import {Router} from "express";
import { registerUser, loginUser, getUserData } from "../controllers/User.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/:id", getUserData);

export default router;