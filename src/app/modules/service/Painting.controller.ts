import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { serviceFilterableFields } from "./Painting.constants";
import { PaintingService } from "./Painting.service";

const createService = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await PaintingService.createService(payload);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Painting service created successfully",
      data: result,
    });
})

// Get all services
const getAllServices = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, paginationFields);
    const filterOptions = pick(req.query, serviceFilterableFields);
    const result = await PaintingService.getAllServices( options, filterOptions);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Fetched all services",
      data: result,
    });
});

export const PaintingController = {
    createService,
    getAllServices,
};
