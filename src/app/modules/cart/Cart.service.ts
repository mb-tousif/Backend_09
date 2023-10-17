import { Cart, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { cartSearchableFields } from "./Cart.constants";
import { TCartFilterableOptions } from "./Cart.interfaces";

// Post Cart data to database
const createCart = async (user:  JwtPayload | null, payload: Cart): Promise<Cart> =>{
    const postCart = await prisma.$transaction(async (transactionClient) => {
      // Handle Cart data if service status is not available
      const serviceStatus = await transactionClient.service.findFirst({
        where: {
          id: payload.serviceId,
        },
      });

      if (serviceStatus?.status !== "Available") {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Service is not available to add cart"
        );
      }

      // Check Cart is already exist with same user and service
      const isExist = await transactionClient.cart.findFirst({
        where: {
          userId: user?.id,
          serviceId: payload.serviceId,
        },
      });

      // Check user is blocked or not
      const isActive = await transactionClient.user.findFirst({
        where: {
          id: user?.id,
        },
      });
      if (isActive?.status === "Blocked" || isActive?.status === "Inactive") {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "User is blocked or inactive"
        );
      }

      // Check Cart total price is greater same as service price
      const service = await transactionClient.service.findUnique({
        where: {
          id: payload.serviceId,
        },
      });

      if (!service) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Service did not found");
      }

      if (payload.totalPrice < service.price) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Cart total price is not match service price"
        );
      }
      if (isExist) {
        const result = await transactionClient.cart.update({
          where: {
            id: isExist.id,
          },
          include: {
            services: true,
          },
          data: {
            quantity: {
              increment: payload.quantity || 1,
            },
            totalPrice: {
              increment: service?.price || payload.totalPrice,
            },
          },
        });

        return result;
      }

      // Posting Cart data to database
      const result = await transactionClient.cart.create({
        data: {
          userId: user?.id,
          serviceId: payload.serviceId,
          quantity: payload.quantity || 1,
          totalPrice: service.price || payload.totalPrice,
        },
      });

      if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Cart is not created");
      }

      const booking =await transactionClient.booking.create({
        data: {
          userId: user?.id,
          serviceId: payload.serviceId,
          cartId: result.id,
          schedule: service?.schedule,
        },
      });

      if (!booking) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Booking is not created");
      }

      return result;
    });
    return postCart;
}

// Get all Carts
const getAllCarts = async (
  options: IPaginationOptions,
  payload: TCartFilterableOptions
): Promise<IGenericResponse<Partial<Cart>[]>> => {
  // Handle pagination, custom query, search and filtration
  const { page, limit, skip, sortBy, sortOrder } =
  paginationHelpers.calculatePagination(options);
  
  // Handle search and filter
  const { search, ...filterData } = payload;
  const andCondition = [];
  if (search) {
    andCondition.push({
      OR: cartSearchableFields.map((field) => ({
        [field.toString()]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((field) => ({
        [field]: {
          equals: (filterData as any)[field],
        },
      })),
    });
  }

   const whereQuery: Prisma.CartWhereInput =
     andCondition.length > 0 ? { AND: andCondition } : {};
   const result = await prisma.cart.findMany({
     where: whereQuery,
     skip,
     take: limit,
     orderBy: {
       [sortBy]: sortOrder,
     },
     include: {
       users: true,
       services: true
     },
   });

   if (result.length === 0) {
     throw new ApiError(httpStatus.NOT_FOUND, "Cart did not found");
   }
   const count = await prisma.cart.count({
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

// Get carts by user id
const getCartsByUserId = async (
  user: JwtPayload | null,
  options: IPaginationOptions,
  payload: TCartFilterableOptions
): Promise<IGenericResponse<Partial<Cart>[]>> => {
  // Handle pagination, custom query, search and filtration
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  // Handle search and filter
  const { search, ...filterData } = payload;
  const query: Prisma.CartFindManyArgs = {
    where: {
      userId: {
        contains: user?.id,
      },
      AND: [
        search
          ? {
              OR: cartSearchableFields.map((field) => ({
                [field.toString()]: {
                  contains: search,
                  mode: "insensitive",
                },
              })),
            }
          : {},
        filterData
          ? {
              AND: Object.keys(filterData).map((field) => ({
                [field]: {
                  equals: (filterData as any)[field],
                },
              })),
            }
          : {},
      ],
    },
    orderBy: {
      [sortBy as string]: sortOrder,
    },
  };

  const carts = await prisma.cart.findMany({
    where: query.where,
    include: {
      services: true
    },
    orderBy: query.orderBy,
    skip: query.skip,
    take: query.take,
  });

  // Throw error if any service data is not found
  if (carts.length <= 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You have not added any service to cart"
    );
  }
  const total = await prisma.cart.count({
    where: query.where,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: carts,
  };
};

// Get Cart by id
const getCartById = async ( payload: string): Promise<Cart> => {
    const result = await prisma.cart.findUnique({
        where: {
            id: payload
        },
        include: {
            users: true,
            services: true
        }
    });

    if(!result){
        throw new ApiError(httpStatus.BAD_REQUEST, "Cart did not found");
    }

    return result;
}

// Update Cart by id
const updateCartById = async ( payload: string, data: Cart ): Promise<Cart> => {
    // Update Cart data
    const result = await prisma.cart.update({
        where: {
            id: payload
        },
        data
    });

    if(!result){
        throw new ApiError(httpStatus.BAD_REQUEST, "Cart did not found");
    }

    return result;
}

// Delete Cart by id
const deleteCartById = async ( payload: string ): Promise<Cart> => {
  const deleteCart = await prisma.$transaction(async (transactionClient) => {
    // handle booking data
    const booking = await transactionClient.booking.findFirst({
      where: {
        cartId: payload,
      },
    });
    const deleteBooking = await transactionClient.booking.delete({
      where: {
        id: booking?.id,
      },
    });
    if (!deleteBooking) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Booking did not deleted");
    }

    const result = await transactionClient.cart.delete({
      where: {
        id: payload,
      },
    });

    if(!result){
        throw new ApiError(httpStatus.BAD_REQUEST, "Cart did not deleted");
    }

    return result;
})
return deleteCart;
}

export const CartService = {
    createCart,
    getAllCarts,
    getCartsByUserId,
    getCartById,
    updateCartById,
    deleteCartById
};
