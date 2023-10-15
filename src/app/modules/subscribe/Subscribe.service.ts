import { Subscribe } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";

// Post Subscribe data to database
const createSubscribe = async (payload: Subscribe): Promise<Subscribe> => {
  // Check Subscribe is already exist with same user and service
  const isExist = await prisma.subscribe.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You already subscribed this service");
  }

  const result = await prisma.subscribe.create({
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Subscribe did not created");
  }

  return result;
};

// Get all Subscribes
const getAllSubscribes = async (
  options: IPaginationOptions,
): Promise<IGenericResponse<Subscribe[]>> => {
  // Handle pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  // get all subscribes
  const result = await prisma.subscribe.findMany({
    take: limit,
    skip: skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  // get count of all subscribes
  const count = await prisma.subscribe.count();
  return {
    meta: {
      page,
      limit,
      total: count,
    },
    data: result,
  };
};

// Get Subscribe by id
const getSubscribeById = async (SubscribeId: string): Promise<Subscribe> => {
  const result = await prisma.subscribe.findUnique({
    where: {
      id: SubscribeId,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Subscribe did not found");
  }

  return result;
};

// Delete Subscribe by id
const deleteSubscribeById = async (subscribeId: string): Promise<Subscribe> => {
  const result = await prisma.subscribe.delete({
    where: {
      id: subscribeId,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Subscribe did not found");
  }

  return result;
};

export const SubscribeService = {
    createSubscribe,
    getAllSubscribes,
    deleteSubscribeById,
};

