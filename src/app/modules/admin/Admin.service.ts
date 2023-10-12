import { User } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";

const updateUserById = async (
  payload: string,
  data: Partial<User>
): Promise<Partial<User>> => {
  const isExist = await prisma.user.findUnique({
    where: {
      id: payload,
    },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User did not found to update");
  }
  const user = await prisma.user.update({
    where: {
      id: payload,
    },
    data: data,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      contact: true,
      address: true,
      imgUrl: true,
    },
  });

  return user;
};

export const AdminService = {
    updateUserById,
};
