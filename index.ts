import express, { Request, Response } from "express";
import AuthRoutes from "./src/routes/AuthRoutes";
import dotenv from "dotenv";
import morgan from "morgan";
import prisma from "./src/prisma";
import cors from "cors";

const app = express();
const port = 3000;

//body on the res
app.use(express.json());
dotenv.config({ path: "./.env" });
app.use(morgan("dev"));

app.use(cors());

app.get("/api/health", async (req, res) => {
  console.log("hello ");
  try {
    const count = await prisma.user.count();
    console.log("count ");

    res.status(200).json({ status: "OK", recordsInDB: count });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", error });
  }
});

app.use("/api/v1/auth", AuthRoutes);

// handle undefined routes
app.use((req: Request, res: Response) => {
  console.log("Undefined route accessed:", req.originalUrl);
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
