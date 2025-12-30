import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRETKEY;

interface JwtPayload {
  id: string;
  email: string;
  name?: string;
}

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!secretKey) {
      return res.status(500).json({ msg: "JWT secret key is not defined" });
    }

    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    // Attach user info to request
    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};
