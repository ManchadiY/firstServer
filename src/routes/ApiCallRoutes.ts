import { Router } from "express";
import {
  createApiCall,
  deleteApiCall,
} from "./../controller/ApiCallController";
import { authMiddleware } from "../middleware/AuthMiddleware";

const router = Router();

router.post("/", authMiddleware, createApiCall);
router.delete("/:id", authMiddleware, deleteApiCall);
export default router;
