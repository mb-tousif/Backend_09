
import { Prisma, Review } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { ReviewFilterAbleField } from "./Review.constants";
import { TReviewFilterableOptions } from "./Review.interfaces";

// Post Review data to database
const createReview = async (payload: Review): Promise<Review> => {
  // Check user is blocked or not
  const isActive = await prisma.user.findFirst({
    where: {
      id: payload.userId,
    },
  });
  if (isActive?.status === "Blocked" || isActive?.status === "Inactive") {
    throw new ApiError(httpStatus.BAD_REQUEST, "User is blocked or inactive");
  }
  // Check Review is already exist with same user and service
  const isExist = await prisma.review.findFirst({
    where: {
      userId: payload.userId,
      serviceId: payload.serviceId,
    },
  });
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Review is already exist");
  }
  const result = await prisma.review.create({
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Review did not created");
  }

  return result;
};

// Get all Reviews
const getAllReviews = async (
  options: IPaginationOptions,
  payload: TReviewFilterableOptions
): Promise<IGenericResponse<Review[]>> => {
  // Handle pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  // Handle search
  const { search, ...filterData } = payload;
  const andCondition = [];
  if (search) {
    andCondition.push({
      OR: ReviewFilterAbleField.map((field) => ({
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

  const whereQuery: Prisma.ReviewWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.review.findMany({
    where: whereQuery,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      users: true,
      services: true,
    },
  });

  if (result.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "Review did not found");
  }
  const count = await prisma.review.count({
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

// Get Review by id
const getReviewById = async (ReviewId: string): Promise<Review> => {
  const result = await prisma.review.findUnique({
    where: {
      id: ReviewId,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Review did not found");
  }

  return result;
};

// Update Review by id
const updateReviewById = async ( ReviewId: string, payload: Review): Promise<Review> => {
  const result = await prisma.review.update({
    where: {
      id: ReviewId,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Review did not found");
  }

  return result;
};

// Delete Review by id
const deleteReviewById = async (ReviewId: string): Promise<Review> => {
  const result = await prisma.review.delete({
    where: {
      id: ReviewId,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Review did not found");
  }

  return result;
};

export const ReviewService = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReviewById,
    deleteReviewById,
};

