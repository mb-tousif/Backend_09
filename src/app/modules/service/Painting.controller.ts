import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { PaintingService } from "./Painting.service";

const createService = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await PaintingService.createService(payload);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User created successfully",
      data: result,
    });
})

// Get all services
const getAllServices = catchAsync(async (req: Request, res: Response) => {
    const payload = req.query;
    const result = await PaintingService.getAllServices(payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All services",
      data: result,
    });
});

export const PaintingController = {
    createService,
    getAllServices,
};
