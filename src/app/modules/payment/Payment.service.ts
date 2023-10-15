import { Payment, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { PaymentSearchAbleField } from "./Payment.constants";
import { TPaymentFilterableOptions } from "./Payment.interfaces";

// Post Payment data to database
const createPayment = async (
  user: JwtPayload | null,
  payload: Payment
): Promise<Payment> => {
  // Check user is blocked or not
  const isActive = await prisma.user.findFirst({
    where: {
      id: user?.id,
    },
  });
  if (isActive?.status === "Blocked" || isActive?.status === "Inactive") {
    throw new ApiError(httpStatus.BAD_REQUEST, "User is blocked or inactive");
  }

  const result = await prisma.payment.create({
    data: {
      userId: user?.id,
      bookingId: payload.bookingId,
      serviceId: payload.serviceId,
      amount: payload.amount,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Payment did not created");
  }

  return result;
};

// Get all Payments
const getAllPayments = async (
  options: IPaginationOptions,
  payload: TPaymentFilterableOptions
): Promise<IGenericResponse<Payment[]>> => {
  // Handle pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  // Handle search
  const { search, ...filterData } = payload;
  const andCondition = [];
  if (search) {
    andCondition.push({
      OR: PaymentSearchAbleField.map((field) => ({
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

  const whereQuery: Prisma.PaymentWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.payment.findMany({
    where: whereQuery,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      users: true,
      bookings: true,
      notifications: true,
    },
  });

  if (result.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "Payment did not found");
  }
  const count = await prisma.payment.count({
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

// Get Payment by id
const getPaymentById = async (paymentId: string): Promise<Payment> => {
  const result = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
    include: {
      users: true,
      bookings: true,
      notifications: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Payment did not found");
  }

  return result;
};

// Update Payment by id
const updatePaymentById = async ( paymentId: string, payload: Payment): Promise<Payment> => {
  // Handle Payment is already completed
  const isCompletedOrRefunded = await prisma.payment.findFirst({
    where: {
      id: paymentId,
      status: "Paid" || "Refunded",
    },
  });
  if (isCompletedOrRefunded) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Payment already completed or refunded, now you can not update it"
    );
  }

  if(payload.status !== "Pending" && payload.amount > 0){
    await prisma.notification.create({
      data: {
        userId: payload.userId,
        bookingId: payload.bookingId,
        paymentId: paymentId,
        message: `Your payment amount is ${payload.amount} and status ${payload.status}`,
      },
    });
  }

  const result = await prisma.payment.update({
    where: {
      id: paymentId,
    },
    data: payload,
    include: {
      users: true,
      bookings: true,
      notifications: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Payment did not found");
  }

  return result;
};

// Delete Payment by id
const deletePaymentById = async (PaymentId: string): Promise<Payment> => {
  const result = await prisma.payment.delete({
    where: {
      id: PaymentId,
    },
    include: {
      users: true,
      bookings: true,
      notifications: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Payment did not found");
  }

  return result;
};

export const PaymentService = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePaymentById,
    deletePaymentById,
};

