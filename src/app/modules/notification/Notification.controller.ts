
import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { NotificationFilterAbleField } from "./Notification.constants";
import { NotificationService } from "./Notification.service";

// Create and Save new Notification
const createNotification = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await NotificationService.createNotification(payload);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Notification created successfully",
      data: result,
    });
})

// Retrieve all Notifications from the database.
const getAllNotifications = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, paginationFields);
    const payload = pick(req.query, NotificationFilterAbleField);
    const result = await NotificationService.getAllNotifications( options, payload );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Notification list fetched successfully",
      data: result,
    });
});

// Find a single Notification with an id
const getNotificationById = catchAsync(async (req: Request, res: Response) => {
    const NotificationId = req.params.id;
    const result = await NotificationService.getNotificationById(NotificationId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Notification fetched successfully",
      data: result,
    });
});

// Update a Notification by id
const updateNotificationById = catchAsync(async (req: Request, res: Response) => {
    const NotificationId = req.params.id;
    const payload = req.body;
    const result = await NotificationService.updateNotificationById(NotificationId, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Notification updated successfully",
      data: result,
    });
});

// Delete a Notification with the specified id 
const deleteNotificationById = catchAsync(async (req: Request, res: Response) => {
    const NotificationId = req.params.id;
    const result = await NotificationService.deleteNotificationById(NotificationId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Notification deleted successfully",
      data: result,
    });
});

export const NotificationController = {
    createNotification,
    getAllNotifications,
    getNotificationById,
    updateNotificationById,
    deleteNotificationById,
};

