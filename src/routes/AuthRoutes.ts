import { Router } from "express";
import { createuser, login } from "./../controller/AuthController";

const router = Router();

router.post("/signup", createuser);
router.post("/login", login);
export default router;
