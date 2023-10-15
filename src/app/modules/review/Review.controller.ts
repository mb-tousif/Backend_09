
import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { ReviewFilterAbleField } from "./Review.constants";
import { ReviewService } from "./Review.service";

// Create and Save new Review
const createReview = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const { ...payload }= req.body;
    const result = await ReviewService.createReview(user, payload);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Review created successfully",
      data: result,
    });
})

// Retrieve all Reviews from the database.
const getAllReviews = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, paginationFields);
    const payload = pick(req.query, ReviewFilterAbleField);
    const result = await ReviewService.getAllReviews( options, payload );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review list fetched successfully",
      data: result,
    });
});

// Find a single Review with an id
const getReviewById = catchAsync(async (req: Request, res: Response) => {
    const ReviewId = req.params.id;
    const result = await ReviewService.getReviewById(ReviewId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review fetched successfully",
      data: result,
    });
});

// Update a Review by id
const updateReviewById = catchAsync(async (req: Request, res: Response) => {
    const ReviewId = req.params.id;
    const payload = req.body;
    const result = await ReviewService.updateReviewById(ReviewId, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review updated successfully",
      data: result,
    });
});

// Delete a Review with the specified id 
const deleteReviewById = catchAsync(async (req: Request, res: Response) => {
    const ReviewId = req.params.id;
    const result = await ReviewService.deleteReviewById(ReviewId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review deleted successfully",
      data: result,
    });
});

export const ReviewController = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReviewById,
    deleteReviewById,
};

