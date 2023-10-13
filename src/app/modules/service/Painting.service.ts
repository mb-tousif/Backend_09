import { Prisma, Service } from "@prisma/client";
import httpStatus from "http-status";
import { ENUM_SERVICE_CATEGORY, furniturePaintName, homePaintName, officePaintName, shopPaintName } from "../../../enums/common";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { serviceSearchableFields } from "./Painting.constants";
import { TServiceFilterableOptions } from "./Painting.interfaces";

const createService = async (payload: Service): Promise<Service> =>{
  // Handle duplicate service Data
    const isServiceExist = await prisma.service.findUnique({
        where: {
            name: payload.name
        }
    });
    if(isServiceExist){
        throw new ApiError( httpStatus.BAD_REQUEST, "Service already exist")
    }

    // Check service name and category is match or not
    if(payload.category === ENUM_SERVICE_CATEGORY.FURNITURE_PAINTING && !furniturePaintName.includes(payload.name)){
        throw new ApiError(httpStatus.BAD_REQUEST, "This service, we don't provide");
    }

    if (payload.category === ENUM_SERVICE_CATEGORY.HOME_PAINTING && !homePaintName.includes(payload.name)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "This service, we don't provide");
    }

    if (payload.category === ENUM_SERVICE_CATEGORY.OFFICE_PAINTING && !officePaintName.includes(payload.name)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "This service, we don't provide");
    }

    if (payload.category === ENUM_SERVICE_CATEGORY.SHOP_PAINTING && !shopPaintName.includes(payload.name)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "This service, we don't provide");
    }

    // Posting service data to database
    const service = await prisma.service.create({
        data: payload
    });

    if(!service){
        throw new ApiError(httpStatus.BAD_REQUEST, "Service is not created");
    }

    return service;
}

// Get all services
const getAllServices = async (
  options: IPaginationOptions,
  payload: TServiceFilterableOptions
): Promise<IGenericResponse<Partial<Service>[]>> => {

  // Handle pagination, custom query, search and filtration
  const { search, minPrice, maxPrice, ...filterData } = payload;
  const { page, limit, sortBy, sortOrder } = paginationHelpers.calculatePagination(options);
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

  const services = await prisma.service.findMany({
    where: query.where,
    orderBy: query.orderBy,
    skip: query.skip,
    take: query.take,
  });

  // Throw error if any service data is not found
  if (services.length <= 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Any Painting service is not found");
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
