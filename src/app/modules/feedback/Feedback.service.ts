import { Feedback, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { FeedbackSearchAbleField } from "./Feedback.constants";
import { TFeedbackFilterableOptions } from "./Feedback.interfaces";

// Post Feedback data to database
const createFeedback = async ( user:JwtPayload | null, payload: Feedback): Promise<Feedback> => {
  // Check user is blocked or not
  const isActive = await prisma.user.findFirst({
    where: {
      id: user?.id,
    },
  });
  if (isActive?.status === "Blocked" || isActive?.status === "Inactive") {
    throw new ApiError(httpStatus.BAD_REQUEST, "User is blocked or inactive");
  }

  const result = await prisma.feedback.create({
    data: {
      userId: user?.id,
      comment: payload.comment,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Feedback did not created");
  }

  return result;
};

// Get all Feedbacks
const getAllFeedbacks = async (
  options: IPaginationOptions,
  payload: TFeedbackFilterableOptions
): Promise<IGenericResponse<Feedback[]>> => {
  // Handle pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  // Handle search
  const { search, ...filterData } = payload;
  const andCondition = [];
  if (search) {
    andCondition.push({
      OR: FeedbackSearchAbleField.map((field) => ({
        [field.toString()]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }
  // Handle filter
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((field) => ({
        [field]: {
          equals: (filterData as any)[field],
        },
      })),
    });
  }

  const whereQuery: Prisma.FeedbackWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.feedback.findMany({
    where: whereQuery,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      users: true,
    },
  });

  if (result.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "Feedback did not found");
  }
  const count = await prisma.feedback.count({
    where: whereQuery,
  });

  return {
    meta: {
      page,
      limit,
      total: count,
    },
    data: result,
  };
};

// Get Feedback by id
const getFeedbackById = async (FeedbackId: string): Promise<Feedback> => {
  const result = await prisma.feedback.findUnique({
    where: {
      id: FeedbackId,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Feedback did not found");
  }

  return result;
};

// Update Feedback by id
const updateFeedbackById = async ( FeedbackId: string, payload: Feedback): Promise<Feedback> => {
  const result = await prisma.feedback.update({
    where: {
      id: FeedbackId,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Feedback did not found");
  }

  return result;
};

// Delete Feedback by id
const deleteFeedbackById = async (FeedbackId: string): Promise<Feedback> => {
  const result = await prisma.feedback.delete({
    where: {
      id: FeedbackId,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Feedback did not found");
  }

  return result;
};

export const FeedbackService = {
    createFeedback,
    getAllFeedbacks,
    getFeedbackById,
    updateFeedbackById,
    deleteFeedbackById,
};

