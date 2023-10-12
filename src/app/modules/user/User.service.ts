import { Prisma, User } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { hashPasswordHelper } from "../../../helpers/hashPasswordHelper";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { userSearchableFields } from "./User.constants";
import { TFilterableFields } from "./User.interfaces";

// Get All users
const getAllUsers = async (options:IPaginationOptions, filterOptions: TFilterableFields):Promise<IGenericResponse<Partial<User>[]>> => {

  // Handle pagination
  const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(options);

  // Handle search and filter
  const { search, ...filterData } = filterOptions;
  const andCondition = [];
  if (search) {
    andCondition.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((field) => ({
        [field]: {
          equals: (filterData as any)[field],
        },
      })),
    });
  }

  const whereQuery: Prisma.UserWhereInput | {} = andCondition.length > 0 ? { AND: andCondition } : {};
  const users = await prisma.user.findMany({
    where: whereQuery,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
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

  if (users.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
  }
  const count = await prisma.user.count({
    where: whereQuery,
  });
  return {
    meta: {
      page,
      limit,
      total: count,
    },
    data: users,
  };
};

// Get user profile by id
const getProfileById = async (payload: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id: payload,
    },
    include: {
      bookings: true,
      reviews: true,
      carts: true,
      blogs: true,
      feedbacks: true,
      notifications: true,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  return user;
};

// Update user profile by id
const updateProfileById = async (
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

  // hash password if user update password field
  if (data.password && data.password.length > 0) {
    data.password = await hashPasswordHelper.hashPassword(data.password);
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

// Delete user by id
const deleteUserById = async (payload: string): Promise<User | null> => {
  const isExist = await prisma.user.findUnique({
    where: {
      id: payload,
    },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User did not found to delete");
  }

  const user = await prisma.user.delete({
    where: {
      id: payload,
    },
  });

  return user;
}

export const UserService = {
    getAllUsers,
    getProfileById,
    updateProfileById,
    deleteUserById,
};
