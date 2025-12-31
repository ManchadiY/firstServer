import { Router } from "express";
import {
  createApiCall,
  deleteApiCall,
  getAllApiCalls,
} from "./../controller/ApiCallController";
import { authMiddleware } from "../middleware/AuthMiddleware";

const router = Router();
router.get("/", authMiddleware, getAllApiCalls);
router.post("/", authMiddleware, createApiCall);
router.delete("/:id", authMiddleware, deleteApiCall);
export default router;
