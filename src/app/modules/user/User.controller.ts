import { Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { paginationFields } from "../../../constants/pagination";
import { ENUM_USER_ROLE } from "../../../enums/user";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { userFilterableFields } from "./User.constants";
import { UserService } from "./User.service";

// Get All users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);
  const filterOptions = pick(req.query, userFilterableFields);
  const result = await UserService.getAllUsers( options, filterOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get all users successfully",
    data: result,
  });
})

// Get user profile by id
const getProfileById = catchAsync(async (req: Request, res: Response) => {
  const payload = req.params.id;
  const token = req.headers.authorization as string;
  // Handle case user get profile another user
  const decodedToken = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );
  if ( decodedToken.role === ENUM_USER_ROLE.USER && decodedToken.id !== payload) {
    throw new ApiError(httpStatus.FORBIDDEN, "You can get only your profile.");
  }
  const result = await UserService.getProfileById(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get profile successfully",
    data: result,
  });
});

// Update user profile by id
const updateProfileById = catchAsync(async (req: Request, res: Response) => {
  const payload = req.params.id;
  const token = req.headers.authorization as string;
  const data = req.body;
  // Handle case user get profile another user
  const decodedToken = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );
  if (
    decodedToken.role === ENUM_USER_ROLE.USER &&
    decodedToken.id !== payload
  ) {
    throw new ApiError(httpStatus.FORBIDDEN, "You can update only your profile.");
  }
  const result = await UserService.updateProfileById(payload, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update profile successfully",
    data: result,
  });
});

// Delete user by id
const deleteUserById = catchAsync(async (req: Request, res: Response) => {
  const payload = req.params.id;
  const result = await UserService.deleteUserById(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete user successfully",
    data: result,
  });
})

export const UserController = {
    getAllUsers,
    getProfileById,
    updateProfileById,
    deleteUserById,
};
