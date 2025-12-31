"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.SECRETKEY;
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "Authorization token missing" });
        }
        const token = authHeader.split(" ")[1];
        if (!secretKey) {
            return res.status(500).json({ msg: "JWT secret key is not defined" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        // Attach user info to request
        req.user = decoded;
        console.log("decoded", decoded);
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
};
exports.authMiddleware = authMiddleware;
