"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("./../controller/AuthController");
const router = (0, express_1.Router)();
router.post("/signup", AuthController_1.createuser);
exports.default = router;
