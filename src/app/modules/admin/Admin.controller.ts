import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AdminService } from "./Admin.service";

const createAllUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = await AdminService.createAllUser(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: user,
  });
});

const updateUserById = catchAsync(async (req: Request, res: Response) => {
  const payload = req.params.id;
  const data = req.body;
  const result = await AdminService.updateUserById(payload, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Update profile successfully",
    data: result,
  });
});

export const AdminController = {
    createAllUser,
    updateUserById,
};
