"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteApiCall = exports.createApiCall = void 0;
const prisma_1 = __importDefault(require("../prisma"));
// Create a new API call
const createApiCall = async (req, res) => {
    const { name, description, method, url, headers, body, userId } = req.body;
    if (!name || !method || !url || !userId) {
        return res
            .status(400)
            .json({ msg: "Name, method, url, and userId are required" });
    }
    try {
        // Create the API call
        const apiCall = await prisma_1.default.apiCall.create({
            data: {
                name,
                description,
                method,
                url,
                headers: headers ? headers : null, // JSON array of headers
                body: body ? body : null,
                userId,
            },
        });
        return res.status(201).json({ msg: "API call created", apiCall });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error", error });
    }
};
exports.createApiCall = createApiCall;
// Delete an API call by id
const deleteApiCall = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ msg: "API call ID is required" });
    }
    try {
        // Check if API call exists
        const existing = await prisma_1.default.apiCall.findUnique({ where: { id } });
        if (!existing)
            return res.status(404).json({ msg: "API call not found" });
        // Delete API call
        await prisma_1.default.apiCall.delete({ where: { id } });
        return res.status(200).json({ msg: "API call deleted successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error", error });
    }
};
exports.deleteApiCall = deleteApiCall;
