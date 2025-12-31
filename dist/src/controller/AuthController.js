"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.createuser = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.SECRETKEY;
const createuser = async (req, res) => {
    const { name, email, password, passwordConfirm } = req.body;
    if (!secretKey)
        return res.status(500).json({ msg: " secret key is not defined" });
    if (password !== passwordConfirm) {
        return res
            .status(400)
            .json({ msg: "password and confirm password should be same " });
    }
    console.log("resbody", req.body);
    if (!email || !password) {
        return res.status(400).json({ msg: "Email and password are required" });
    }
    try {
        // Check if email exists
        const emailExists = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (emailExists)
            return res.status(409).json({ msg: "Email already exists" });
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Create user
        const user = await prisma_1.default.user.create({
            data: { name, email, password: hashedPassword },
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, secretKey, { expiresIn: "1h" });
        return res.status(201).json({
            msg: "User created",
            jwt: token,
            user: { email: user.email, name: user.name },
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ msg: "Internal server error" });
    }
};
exports.createuser = createuser;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!secretKey)
        return res.status(500).json({ msg: "JWT secret key is not defined" });
    if (!email || !password) {
        return res.status(400).json({ msg: "Email and password are required" });
    }
    try {
        const user = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user)
            return res.status(404).json({ msg: "User not found" });
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(401).json({ msg: "Invalid password" });
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, secretKey, { expiresIn: "12h" });
        return res.status(200).json({
            msg: "User signed in",
            user: { email: user.email, name: user.name },
            jwt: token,
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ msg: "Internal server error", error: e });
    }
};
exports.login = login;
const logout = async (_req, res) => {
    // With JWT, logout is handled client-side by deleting the token
    return res.status(200).json({ msg: "User logged out successfully" });
};
exports.logout = logout;
