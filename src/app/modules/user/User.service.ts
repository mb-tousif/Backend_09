import { User } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";

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

export const UserService = {
    getProfileById,
};
