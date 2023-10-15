import { Booking, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { BookingFilterAbleField } from "./Booking.constants";
import { TBookingFilterableOptions } from "./Booking.interfaces";

// Post Booking data to database
const createBooking = async ( user: JwtPayload | null, payload: Booking): Promise<Booking> => {
  // Handle user is blocked or not
  const isActive = await prisma.user.findFirst({
    where: {
      id: user?.id,
    },
  });
  if (isActive?.status === "Blocked" || isActive?.status === "Inactive") {
    throw new ApiError(httpStatus.BAD_REQUEST, "User is blocked or inactive");
  }

  // Handle Cart data if service status is not available
  const serviceStatus = await prisma.service.findFirst({
    where: {
      id: payload.serviceId,
    },
  });

  if (serviceStatus?.status !== "Available") {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Service is not available for booking"
    );
  }

  // Handle duplicate booking Data
  const booking = await prisma.booking.create({
    data: {
      userId: user?.id,
      serviceId: payload.serviceId,
    },
  });

  if (!booking) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Booking did not created");
  }

  return booking;
};

// Get all Bookings
const getAllBookings = async (
  options: IPaginationOptions,
  payload: TBookingFilterableOptions
): Promise<IGenericResponse<Booking[]>> => {
  // Handle pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  // Handle search
  const { search, ...filterData } = payload;
  const andCondition = [];
  if (search) {
    andCondition.push({
      OR: BookingFilterAbleField.map((field) => ({
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

  const whereQuery: Prisma.BookingWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.booking.findMany({
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
    throw new ApiError(httpStatus.NOT_FOUND, "Booking did not found");
  }
  const count = await prisma.booking.count({
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

// Get Booking by id
const getBookingById = async (bookingId: string): Promise<Booking> => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, "Booking did not found");
  }

  return booking;
};

// Update Booking by id
const updateBookingById = async ( bookingId: string, payload: Booking): Promise<Booking> => {
  // Handle Booking is already completed
  const isCompleted = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      status: "Completed",
    },
  });
  if (isCompleted) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Booking already completed now you can not update it"
    );
  }

  const booking = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: payload,
  });

  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, "Booking did not found");
  }

  return booking;
};

// Delete Booking by id
const deleteBookingById = async (bookingId: string): Promise<Booking> => {
  const booking = await prisma.booking.delete({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, "Booking did not found");
  }

  return booking;
};

export const BookingService = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingById,
    deleteBookingById,
};
