import { Prisma, Service } from "@prisma/client";
import httpStatus from "http-status";
import { ENUM_SERVICE_CATEGORY, furniturePaintName, homePaintName, officePaintName, shopPaintName } from "../../../enums/common";
import ApiError from "../../../errors/ApiError";
import { IGenericResponse } from "../../../interfaces/common";
import prisma from "../../../shared/prisma";
import { serviceSearchableFields } from "./Painting.constants";
import { TQueryParams } from "./Painting.interfaces";

const createService = async (payload: Service): Promise<Service> =>{
    const isServiceExist = await prisma.service.findUnique({
        where: {
            name: payload.name
        }
    });
    
    if(isServiceExist){
        throw new ApiError( httpStatus.BAD_REQUEST, "Service already exist")
    }

    // Check service name and category is match or not
    if(payload.category === ENUM_SERVICE_CATEGORY.FURNITURE_PAINT && !furniturePaintName.includes(payload.name)){
        throw new ApiError(httpStatus.BAD_REQUEST, "This service, we don't provide");
    }

    if (payload.category === ENUM_SERVICE_CATEGORY.HOME_PAINT && !homePaintName.includes(payload.name)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "This service, we don't provide");
    }

    if (payload.category === ENUM_SERVICE_CATEGORY.OFFICE_PAINT && !officePaintName.includes(payload.name)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "This service, we don't provide");
    }

    if (payload.category === ENUM_SERVICE_CATEGORY.SHOP_PAINT && !shopPaintName.includes(payload.name)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "This service, we don't provide");
    }

    const service = await prisma.service.create({
        data: payload
    });
    return service;
}

// Get all services
const getAllServices = async (
  payload: TQueryParams
): Promise<IGenericResponse<Partial<Service>[]>> => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
    search,
    minPrice,
    maxPrice,
  } = payload;
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);
  const query: Prisma.ServiceFindManyArgs = {
    where: {
      AND: [
        minPrice ? { price: { gte: parseFloat(minPrice.toString()) } } : {},
        maxPrice ? { price: { lte: parseFloat(maxPrice.toString()) } } : {},
        search
          ? {
              OR: serviceSearchableFields.map((field) => ({
                [field.toString()]: {
                  contains: search,
                  mode: "insensitive",
                },
              })),
            }
          : {},
      ],
    },
    orderBy: {
      [sortBy as string]: sortOrder,
    },
    skip,
    take,
  };

  const services = await prisma.service.findMany({
    where: query.where,
    orderBy: query.orderBy,
    skip: query.skip,
    take: query.take,
  });
  if (services.length <= 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Any Painting service not found");
  }
  const total = await prisma.service.count({
    where: query.where,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: services,
  };
};

export const PaintingService = {
    createService,
    getAllServices
};
