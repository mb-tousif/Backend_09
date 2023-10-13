import { Blogs, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { BlogsSearchAbleField } from "./Blogs.constants";
import { TBlogsFilterableOptions } from "./Blogs.interfaces";

// Post Blogs data to database
const createBlogs = async (payload: Blogs): Promise<Blogs> => {
  // Check user is blocked or not
  const isActive = await prisma.user.findFirst({
    where: {
      id: payload.userId,
    },
  });
  if (isActive?.status === "Blocked" || isActive?.status === "Inactive") {
    throw new ApiError(httpStatus.BAD_REQUEST, "User is blocked or inactive");
  }

  // Check Blogs is already exist with same user and service
  const isExist = await prisma.blogs.findFirst({
    where: {
      title: payload.title,
    },
  });
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Blogs is already exist");
  }

  const result = await prisma.blogs.create({
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Blogs did not created");
  }

  return result;
};

// Get all Blogs
const getAllBlogs = async (
  options: IPaginationOptions,
  payload: TBlogsFilterableOptions
): Promise<IGenericResponse<Blogs[]>> => {
  // Handle pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  // Handle search
  const { search, ...filterData } = payload;
  const andCondition = [];
  if (search) {
    andCondition.push({
      OR: BlogsSearchAbleField.map((field) => ({
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

  const whereQuery: Prisma.BlogsWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.blogs.findMany({
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
    throw new ApiError(httpStatus.NOT_FOUND, "Blogs did not found");
  }
  const count = await prisma.blogs.count({
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

// Get Blogs by id
const getBlogsById = async (blogId: string): Promise<Blogs> => {
  const result = await prisma.blogs.findUnique({
    where: {
      id: blogId,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blogs did not found");
  }

  return result;
};

// Update Blogs by id
const updateBlogsById = async ( blogId: string, payload: Blogs): Promise<Blogs> => {
  // Handle Blogs is already completed
  const isCompleted = await prisma.blogs.findFirst({
    where: {
      id: blogId,
    },
  });
  if (isCompleted) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Blogs already completed now you can not update it"
    );
  }

  const result = await prisma.blogs.update({
    where: {
      id: blogId,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blogs did not found");
  }

  return result;
};

// Delete Blogs by id
const deleteBlogsById = async (blogId: string): Promise<Blogs> => {
  const result = await prisma.blogs.delete({
    where: {
      id: blogId,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blogs did not found");
  }

  return result;
};

export const BlogsService = {
    createBlogs,
    getAllBlogs,
    getBlogsById,
    updateBlogsById,
    deleteBlogsById,
};

