import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { SubscribeService } from "./Subscribe.service";

// Create and Save new Subscribe
const createSubscribe = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await SubscribeService.createSubscribe(payload);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Subscribe created successfully",
      data: result,
    });
})

// Retrieve all Subscribes from the database.
const getAllSubscribes = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, paginationFields);
    const result = await SubscribeService.getAllSubscribes( options );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Subscribe list fetched successfully",
      data: result,
    });
});
// Delete a Subscribe with the specified id 
const deleteSubscribeById = catchAsync(async (req: Request, res: Response) => {
    const SubscribeId = req.params.id;
    const result = await SubscribeService.deleteSubscribeById(SubscribeId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Subscribe deleted successfully",
      data: result,
    });
});

export const SubscribeController = {
    createSubscribe,
    getAllSubscribes,
    deleteSubscribeById,
};

