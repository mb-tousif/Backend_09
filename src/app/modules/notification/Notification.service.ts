import { Notification, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { NotificationSearchAbleField } from "./Notification.constants";
import { TNotificationFilterableOptions } from "./Notification.interfaces";

// Post Notification data to database
const createNotification = async ( user:JwtPayload | null,payload: Notification): Promise<Notification> => {

   // Check user is blocked or not
  const isActive = await prisma.user.findFirst({
    where: {
      id: user?.id,
    },
  });
  if (isActive?.status === "Blocked" || isActive?.status === "Inactive") {
    throw new ApiError(httpStatus.BAD_REQUEST, "User is blocked or inactive");
  }

  const result = await prisma.notification.create({
    data: {
      userId: user?.id,
      message: payload.message,
      paymentId: payload.paymentId || null,
      bookingId: payload.bookingId  || null,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Notification did not created");
  }

  return result;
};

// Get all Notifications
const getAllNotifications = async (
  options: IPaginationOptions,
  payload: TNotificationFilterableOptions
): Promise<IGenericResponse<Notification[]>> => {
  // Handle pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  // Handle search
  const { search, ...filterData } = payload;
  const andCondition = [];
  if (search) {
    andCondition.push({
      OR: NotificationSearchAbleField.map((field) => ({
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

  const whereQuery: Prisma.NotificationWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.notification.findMany({
    where: whereQuery,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      users: true,
      bookings: true,
      payments: true,
    },
  });

  if (result.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "Notification did not found");
  }
  const count = await prisma.notification.count({
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

// Get Notification by id
const getNotificationById = async (notificationId: string): Promise<Notification> => {
  const result = await prisma.notification.findUnique({
    where: {
      id: notificationId,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Notification did not found");
  }

  return result;
};

// Update Notification by id
const updateNotificationById = async ( notificationId: string, payload: Notification): Promise<Notification> => {
  const result = await prisma.notification.update({
    where: {
      id: notificationId,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Notification did not found");
  }

  return result;
};

// Delete Notification by id
const deleteNotificationById = async (notificationId: string): Promise<Notification> => {
  const result = await prisma.notification.delete({
    where: {
      id: notificationId,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Notification did not found");
  }

  return result;
};

export const NotificationService = {
    createNotification,
    getAllNotifications,
    getNotificationById,
    updateNotificationById,
    deleteNotificationById,
};

