
import { Prisma, Schedule } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { ENUM_SCHEDULE_STATUS, ScheduleSearchAbleField } from "./Schedule.constants";
import { TScheduleFilterableOptions } from "./Schedule.interfaces";

// Post Schedule data to database
const createSchedule = async (payload: Schedule): Promise<Schedule> => {
  // Handle duplicate Schedule Data
  const isExist = await prisma.schedule.findFirst({
    where: {
      bookingId: payload.bookingId,
      serviceId: payload.serviceId,
    },
  });
  if ( isExist?.status === ENUM_SCHEDULE_STATUS.PENDING){
    throw new ApiError(httpStatus.BAD_REQUEST, "Schedule is already exist with pending status");
  }
  const Schedule = await prisma.schedule.create({
    data: payload,
  });

  if (!Schedule) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Schedule did not created");
  }

  return Schedule;
};

// Get all Schedules
const getAllSchedules = async (
  options: IPaginationOptions,
  payload: TScheduleFilterableOptions
): Promise<IGenericResponse<Schedule[]>> => {
  // Handle pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  // Handle search
  const { search, ...filterData } = payload;
  const andCondition = [];
  if (search) {
    andCondition.push({
      OR: ScheduleSearchAbleField.map((field) => ({
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

  const whereQuery: Prisma.ScheduleWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.schedule.findMany({
    where: whereQuery,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      bookings: true,
      services: true,
    },
  });

  if (result.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "Schedule did not found");
  }
  const count = await prisma.schedule.count({
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

// Get Schedule by id
const getScheduleById = async (ScheduleId: string): Promise<Schedule> => {
  const Schedule = await prisma.schedule.findUnique({
    where: {
      id: ScheduleId,
    },
  });

  if (!Schedule) {
    throw new ApiError(httpStatus.NOT_FOUND, "Schedule did not found");
  }

  return Schedule;
};

// Update Schedule by id
const updateScheduleById = async ( scheduleId: string, payload: Schedule): Promise<Schedule> => {
  // Handle Schedule is already completed
  const isCompleted = await prisma.schedule.findFirst({
    where: {
      id: scheduleId,
      status: "Completed",
    },
    include: {
      bookings: true,
    },
  });
  if (isCompleted) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Schedule already completed now you can not update it"
    );
  }

  const result = await prisma.schedule.update({
    where: {
      id: scheduleId,
    },
    data: payload,
    include: {
      bookings: true,
    },
  });

  // Handle Schedule notification if status is changed
  if (payload.status !== "Pending") {
    await prisma.notification.create({
      data: {
        message: `Your Schedule status is changed to ${payload.status}`,
        bookingId: payload.bookingId,
        userId: result.bookings.userId,
      },
    });
  }

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Schedule did not found");
  }

  return result;
};

// Delete Schedule by id
const deleteScheduleById = async (ScheduleId: string): Promise<Schedule> => {
  const Schedule = await prisma.schedule.delete({
    where: {
      id: ScheduleId,
    },
  });

  if (!Schedule) {
    throw new ApiError(httpStatus.NOT_FOUND, "Schedule did not found");
  }

  return Schedule;
};

export const ScheduleService = {
    createSchedule,
    getAllSchedules,
    getScheduleById,
    updateScheduleById,
    deleteScheduleById,
};