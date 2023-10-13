
import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { FeedbackFilterAbleField } from "./Feedback.constants";
import { FeedbackService } from "./Feedback.service";

// Create and Save new Feedback
const createFeedback = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await FeedbackService.createFeedback(payload);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Feedback created successfully",
      data: result,
    });
})

// Retrieve all Feedbacks from the database.
const getAllFeedbacks = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, paginationFields);
    const payload = pick(req.query, FeedbackFilterAbleField);
    const result = await FeedbackService.getAllFeedbacks( options, payload );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Feedback list fetched successfully",
      data: result,
    });
});

// Find a single Feedback with an id
const getFeedbackById = catchAsync(async (req: Request, res: Response) => {
    const FeedbackId = req.params.id;
    const result = await FeedbackService.getFeedbackById(FeedbackId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Feedback fetched successfully",
      data: result,
    });
});

// Update a Feedback by id
const updateFeedbackById = catchAsync(async (req: Request, res: Response) => {
    const FeedbackId = req.params.id;
    const payload = req.body;
    const result = await FeedbackService.updateFeedbackById(FeedbackId, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Feedback updated successfully",
      data: result,
    });
});

// Delete a Feedback with the specified id 
const deleteFeedbackById = catchAsync(async (req: Request, res: Response) => {
    const FeedbackId = req.params.id;
    const result = await FeedbackService.deleteFeedbackById(FeedbackId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Feedback deleted successfully",
      data: result,
    });
});

export const FeedbackController = {
    createFeedback,
    getAllFeedbacks,
    getFeedbackById,
    updateFeedbackById,
    deleteFeedbackById,
};

