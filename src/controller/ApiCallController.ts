import { Request, Response } from "express";
import prisma from "../prisma";

// Create a new API call
export const createApiCall = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  const { id: userId } = req.user;
  const { name, description, method, url, headers, body } = req.body;

  if (!name || !method || !url || !userId) {
    return res
      .status(400)
      .json({ msg: "Name, method, url, and userId are required" });
  }

  try {
    // Create the API call
    const apiCall = await prisma.apiCall.create({
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

// Delete an API call by id
export const deleteApiCall = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ msg: "API call ID is required" });
  }

  try {
    // Check if API call exists
    const existing = await prisma.apiCall.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ msg: "API call not found" });

    // Delete API call
    await prisma.apiCall.delete({ where: { id } });

    return res.status(200).json({ msg: "API call deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error", error });
  }
};
export const getAllApiCalls = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const userId = req.user.id;

    const apiCalls = await prisma.apiCall.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      count: apiCalls.length,
      apiCalls,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
