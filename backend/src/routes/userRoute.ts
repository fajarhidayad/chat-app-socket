import { Router } from "express";
import { signIn, signUp } from "../controllers/userController";

const router = Router();

// User Sign In
router.post("/signin", signIn);
router.post("/signup", signUp);

export default router;
