import { Service } from "@prisma/client";
import httpStatus from "http-status";
import { ENUM_SERVICE_CATEGORY, furniturePaintName } from "../../../enums/common";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";

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
        throw new ApiError(httpStatus.BAD_REQUEST, "Service name is not match");
    }

    if (payload.category === ENUM_SERVICE_CATEGORY.HOME_PAINT && !furniturePaintName.includes(payload.name)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Service name is not match");
    }

    if (payload.category === ENUM_SERVICE_CATEGORY.OFFICE_PAINT && !furniturePaintName.includes(payload.name)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Service name is not match");
    }

    if (payload.category === ENUM_SERVICE_CATEGORY.SHOP_PAINT && !furniturePaintName.includes(payload.name)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Service name is not match");
    }

    const service = await prisma.service.create({
        data: payload
    });
    return service;
}

export const PaintingService = {
    createService
};
