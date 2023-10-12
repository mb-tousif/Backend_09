import { User } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { hashPasswordHelper } from "../../../helpers/hashPasswordHelper";
import prisma from "../../../shared/prisma";

// Create user in database
const createAdmin = async (payload: User): Promise<Partial<User>> => {
  // Handle if user already exist
  const isExistUser = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });
  if (isExistUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exist');
  }
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

// Update user by id
const updateUserById = async (
  payload: string,
  data: Partial<User>
): Promise<Partial<User>> => {
  const isExist = await prisma.user.findUnique({
    where: {
      id: payload,
    },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User did not found to update");
  }
  const user = await prisma.user.update({
    where: {
      id: payload,
    },
    data: data,
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

export const SuperAdminService = {
    createAdmin,
    updateUserById,
};
