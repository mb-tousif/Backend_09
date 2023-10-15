import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { serviceFilterableFields, serviceFilterableFieldsForPublicApi } from "./Painting.constants";
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

// Get all Available services
const getAllAvailableServices = catchAsync(async (req: Request, res: Response) => {
     const options = pick(req.query, paginationFields);
     const filterOptions = pick(req.query, serviceFilterableFieldsForPublicApi);
    const result = await PaintingService.getAllAvailableServices(options, filterOptions);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Upcoming all services fetched",
      data: result,
    });
});

// Get all Upcoming services
const getAllUpcomingServices = catchAsync(async (req: Request, res: Response) => {
   const options = pick(req.query, paginationFields);
   const filterOptions = pick(req.query, serviceFilterableFieldsForPublicApi);  
  const result = await PaintingService.getAllUpcomingServices( options, filterOptions);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Upcoming all services fetched",
      data: result,
    });
});

// Get service by id
const getServiceById = catchAsync(async (req: Request, res: Response) => {
    const serviceId = req.params.id;
    const result = await PaintingService.getServiceById(serviceId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Fetched service by id",
      data: result,
    });
});

// Update service by id
const updateServiceById = catchAsync(async (req: Request, res: Response) => {
    const serviceId = req.params.id;
    const payload = req.body;
    const result = await PaintingService.updateServiceById(serviceId, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Service updated successfully",
      data: result,
    });
});

// Delete service by id
const deleteServiceById = catchAsync(async (req: Request, res: Response) => {
    const serviceId = req.params.id;
    const result = await PaintingService.deleteServiceById(serviceId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Service deleted successfully",
      data: result,
    });
});

export const PaintingController = {
    createService,
    getAllServices,
    getAllAvailableServices,
    getAllUpcomingServices,
    getServiceById,
    updateServiceById,
    deleteServiceById
};
