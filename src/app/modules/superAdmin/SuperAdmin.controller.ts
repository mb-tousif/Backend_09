import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { SuperAdminService } from "./SuperAdmin.service";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = await SuperAdminService.createAdmin(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin created successfully',
    data: user,
  });
});

const updateUserById = catchAsync(async (req: Request, res: Response) => {
  const payload = req.params.id;
  const data = req.body;
  const result = await SuperAdminService.updateUserById(payload, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Super Admin Update profile successfully",
    data: result,
  });
});

export const SuperAdminController = {
    createAdmin,
    updateUserById,
};
