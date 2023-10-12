import { User } from "@prisma/client";
import httpStatus from "http-status";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { hashPasswordHelper } from "../../../helpers/hashPasswordHelper";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import { ILoginResponse, IRefreshTokenResponse } from "./Auth.interfaces";

// Create user in database
const signupUser = async (payload: User): Promise<Partial<User>> => {
  // Handle if user already exist
  const isExistUser = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });
  if (isExistUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exist');
  }
  // handle if user role is Admin or Super_admin
  // if (payload.role === ENUM_USER_ROLE.ADMIN || payload.role === ENUM_USER_ROLE.SUPER_ADMIN) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'User can not create Admin or Super_admin');
  // }
  // Hashing password
  payload.password = await hashPasswordHelper.hashPassword(payload.password);

  const user = await prisma.user.create({
    data: payload,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      contact: true,
      address: true,
      imgUrl: true,
    },
  });
  return user;
};

// Login user
const loginUser = async (payload: User): Promise<ILoginResponse> => {
  // Handle if user already not exist
  const isUserExist = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not exist');
  }
  // Compare password
  const isPasswordMatch = await hashPasswordHelper.comparePassword(
    payload.password,
    isUserExist.password
  );
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password not match');
  }
  // Generate token
  const token = await jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );

 // Refresh token
  const refreshToken = await jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as string,
    config.jwt.refresh_expires_in as string
  );
  // Check decodedToken
  // const decodedToken = await jwtHelpers.verifyToken(token, config.jwt.secret as string);
  // console.log(decodedToken);

  return {
    token,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as string
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  const isUserExist = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
    signupUser,
    loginUser,
    refreshToken,
};
