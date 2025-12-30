"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ApiCallController_1 = require("./../controller/ApiCallController");
const AuthMiddleware_1 = require("../middleware/AuthMiddleware");
const router = (0, express_1.Router)();
router.post("/", AuthMiddleware_1.authMiddleware, ApiCallController_1.createApiCall);
router.delete("/:id", AuthMiddleware_1.authMiddleware, ApiCallController_1.deleteApiCall);
exports.default = router;
