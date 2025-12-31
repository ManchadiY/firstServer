import { Request, Response } from "express";
import prisma from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRETKEY;

export const createuser = async (req: Request, res: Response) => {
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
    const emailExists = await prisma.user.findUnique({
      where: { email },
    });
    if (emailExists)
      return res.status(409).json({ msg: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      secretKey,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      msg: "User created",
      jwt: token,
      user: { email: user.email, name: user.name },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!secretKey)
    return res.status(500).json({ msg: "JWT secret key is not defined" });

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return res.status(404).json({ msg: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ msg: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      secretKey,
      { expiresIn: "12h" }
    );

    return res.status(200).json({
      msg: "User signed in",
      user: { email: user.email, name: user.name },
      jwt: token,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal server error", error: e });
  }
};

export const logout = async (_req: Request, res: Response) => {
  // With JWT, logout is handled client-side by deleting the token
  return res.status(200).json({ msg: "User logged out successfully" });
};
