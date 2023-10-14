import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { PaymentFilterAbleField } from "./Payment.constants";
import { PaymentService } from "./Payment.service";

// Create and Save new Payment
const createPayment = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await PaymentService.createPayment(payload);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Payment created successfully",
      data: result,
    });
})

// Retrieve all Payments from the database.
const getAllPayments = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, paginationFields);
    const payload = pick(req.query, PaymentFilterAbleField);
    const result = await PaymentService.getAllPayments( options, payload );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment list fetched successfully",
      data: result,
    });
});

// Find a single Payment with an id
const getPaymentById = catchAsync(async (req: Request, res: Response) => {
    const PaymentId = req.params.id;
    const result = await PaymentService.getPaymentById(PaymentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment fetched successfully",
      data: result,
    });
});

// Update a Payment by id
const updatePaymentById = catchAsync(async (req: Request, res: Response) => {
    const PaymentId = req.params.id;
    const payload = req.body;
    const result = await PaymentService.updatePaymentById(PaymentId, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment updated successfully",
      data: result,
    });
});

// Delete a Payment with the specified id 
const deletePaymentById = catchAsync(async (req: Request, res: Response) => {
    const PaymentId = req.params.id;
    const result = await PaymentService.deletePaymentById(PaymentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment deleted successfully",
      data: result,
    });
});

export const PaymentController = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePaymentById,
    deletePaymentById,
};

