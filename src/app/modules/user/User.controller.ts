import { Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { ENUM_USER_ROLE } from "../../../enums/user";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./User.service";

const getProfileById = catchAsync(async (req: Request, res: Response) => {
  const payload = req.params.id;
  const token = req.headers.authorization as string;
  const decodedToken = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );
  if ( decodedToken.role === ENUM_USER_ROLE.USER && decodedToken.id !== payload) {
    throw new ApiError(httpStatus.FORBIDDEN, "You do not have permission");
  }
  const result = await UserService.getProfileById(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get profile successfully",
    data: result,
  });
});

export const UserController = {
    getProfileById,
};
