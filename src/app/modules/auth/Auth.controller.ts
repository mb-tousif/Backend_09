import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IRefreshTokenResponse } from "./Auth.interfaces";
import { AuthService } from "./Auth.service";

const signupUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = await AuthService.signupUser(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: user,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = await AuthService.loginUser(payload);
   const { refreshToken, ...others } = user;

   // set refresh token into cookies
   const cookieOptions = {
     secure: config.env === 'production',
     httpOnly: true,
   };
    res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookies
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  });
});

// reset password
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await AuthService.resetPassword(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully',
    data: result,
  });
});

export const AuthController = {
    signupUser,
    loginUser,
    refreshToken,
    resetPassword
};
