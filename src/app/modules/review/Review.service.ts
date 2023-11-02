
import { Prisma, Review } from "@prisma/client";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { ReviewSearchAbleField } from "./Review.constants";
import { TReviewFilterableOptions } from "./Review.interfaces";

// Post Review data to database
const createReview = async (
  user: JwtPayload | null,
  payload: Review
): Promise<Review> => {
  // Check user is blocked or not
  const isActive = await prisma.user.findFirst({
    where: {
      id: user?.id,
    },
  });
  if (isActive?.status === "Blocked" || isActive?.status === "Inactive") {
    throw new ApiError(httpStatus.BAD_REQUEST, "User is blocked or inactive");
  }
  // Check Review is already exist with same user and service
  const isExist = await prisma.review.findFirst({
    where: {
      userId: user?.id,
      serviceId: payload.serviceId,
    },
  });
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Review is already exist");
  }
  const result = await prisma.review.create({
    data:{
      userId: user?.id,
      serviceId: payload.serviceId,
      rating: payload.rating,
      comment: payload.comment,
    },
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
      OR: ReviewSearchAbleField.map((field) => ({
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
const getReviewById = async (reviewId: string): Promise<Review[]> => {
  const result = await prisma.review.findMany({
    where: {
      serviceId: reviewId,
    },
    include: {
      users: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Review did not found");
  }

  return result;
};

// Update Review by id
const updateReviewById = async ( reviewId: string, payload: Review): Promise<Review> => {
  const result = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Review did not found");
  }

  return result;
};

// Delete Review by id
const deleteReviewById = async (reviewId: string): Promise<Review> => {
  const result = await prisma.review.delete({
    where: {
      id: reviewId,
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

