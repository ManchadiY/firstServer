import { Router } from "express";
import { createuser } from "./../controller/AuthController";

const router = Router();

router.post("/signup", createuser);
export default router;
