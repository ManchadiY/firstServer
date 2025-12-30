"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthRoutes_1 = __importDefault(require("./src/routes/AuthRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const prisma_1 = __importDefault(require("./src/prisma"));
const app = (0, express_1.default)();
const port = 3000;
//body on the res
app.use(express_1.default.json());
dotenv_1.default.config({ path: "./.env" });
app.use((0, morgan_1.default)("dev"));
app.get("/", (req, res) => {
    res.json({ message: "Hello from node server" });
});
app.get("/api/health", async (req, res) => {
    console.log("hello ");
    const count = await prisma_1.default.user.count();
    res.status(200).json({ status: "OK", recordsInDB: count });
});
app.use("/api/v1/auth", AuthRoutes_1.default);
// handle undefined routes
// app.use((req: Request, res: Response) => {
//   console.log("Undefined route accessed:", req.originalUrl);
//   res.status(404).json({ message: "Route not found" });
// });
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
