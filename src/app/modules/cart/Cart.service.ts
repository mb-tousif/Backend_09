import { Cart, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { cartSearchableFields } from "./Cart.constants";
import { TCartFilterableOptions } from "./Cart.interfaces";

// Post Cart data to database
const createCart = async (payload: Cart): Promise<Cart> =>{
    // Check Cart is already exist with same user and service
    const isExist = await prisma.cart.findFirst({
        where: {
            userId: payload.userId,
            serviceId: payload.serviceId
        }
    });

    // Check user is blocked or not
    const isActive = await prisma.user.findFirst({
      where: {
        id: payload.userId,
      },
    });
    if ( isActive?.status === "Blocked" || isActive?.status === "Inactive"){
        throw new ApiError(httpStatus.BAD_REQUEST, "User is blocked or inactive");
    };

    // Check Cart total price is greater same as service price
    const service = await prisma.service.findUnique({
        where: {
            id: payload.serviceId
        }
      });
      
    if ( !service){
        throw new ApiError(httpStatus.BAD_REQUEST, "Service did not found");
    }

    if(payload.totalPrice < service.price){
        throw new ApiError(httpStatus.BAD_REQUEST, "Cart total price is not match service price");
    }

    if(isExist){
       const result = await prisma.cart.update({
          where: {
            id: isExist.id
          },
          data: {
            quantity: {
                increment: payload.quantity || 1
            },
            totalPrice: {
                increment: payload.totalPrice
            }
          },
        });

       return result;
    }

    // Posting Cart data to database
    const result = await prisma.cart.create({
        data: payload
    });

    if(!result){
        throw new ApiError(httpStatus.BAD_REQUEST, "Cart is not created");
    }

    return result;
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

// Get Cart by id
const getCartById = async ( payload: string ): Promise<Cart> => {
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
    const result = await prisma.cart.delete({
        where: {
            id: payload
        }
    });

    if(!result){
        throw new ApiError(httpStatus.BAD_REQUEST, "Cart did not found");
    }

    return result;
}

export const CartService = {
    createCart,
    getAllCarts,
    getCartById,
    updateCartById,
    deleteCartById
};
