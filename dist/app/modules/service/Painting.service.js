"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaintingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const Painting_constants_1 = require("./Painting.constants");
// Post service data to database
const createService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle duplicate service Data
    const isServiceExist = yield prisma_1.default.service.findUnique({
        where: {
            name: payload.name
        }
    });
    if (isServiceExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Service already exist");
    }
    // Check service name and category is match or not
    if (payload.category === Painting_constants_1.ENUM_SERVICE_CATEGORY.FURNITURE_PAINTING && !Painting_constants_1.furniturePaintName.includes(payload.name)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This service, we don't provide");
    }
    if (payload.category === Painting_constants_1.ENUM_SERVICE_CATEGORY.HOME_PAINTING && !Painting_constants_1.homePaintName.includes(payload.name)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This service, we don't provide");
    }
    if (payload.category === Painting_constants_1.ENUM_SERVICE_CATEGORY.OFFICE_PAINTING && !Painting_constants_1.officePaintName.includes(payload.name)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This service, we don't provide");
    }
    if (payload.category === Painting_constants_1.ENUM_SERVICE_CATEGORY.SHOP_PAINTING && !Painting_constants_1.shopPaintName.includes(payload.name)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This service, we don't provide");
    }
    // Posting service data to database
    const service = yield prisma_1.default.service.create({
        data: payload
    });
    if (!service) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Service is not created");
    }
    return service;
});
// Get all services
const getAllServices = (options, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle pagination, custom query, search and filtration
    const { search, minPrice, maxPrice } = payload, filterData = __rest(payload, ["search", "minPrice", "maxPrice"]);
    const { page, limit, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const query = {
        where: {
            AND: [
                minPrice ? { price: { gte: parseFloat(minPrice.toString()) } } : {},
                maxPrice ? { price: { lte: parseFloat(maxPrice.toString()) } } : {},
                search
                    ? {
                        OR: Painting_constants_1.serviceSearchableFields.map((field) => ({
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
                                equals: filterData[field],
                            },
                        })),
                    }
                    : {},
            ],
        },
        orderBy: {
            [sortBy]: sortOrder,
        },
    };
    const services = yield prisma_1.default.service.findMany({
        where: query.where,
        orderBy: query.orderBy,
        skip: query.skip,
        take: query.take,
    });
    // Throw error if any service data is not found
    if (services.length <= 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Any Painting service is not found");
    }
    const total = yield prisma_1.default.service.count({
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
});
// Get service by id
const getServiceById = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield prisma_1.default.service.findUnique({
        where: {
            id: payload
        },
        include: {
            bookings: true,
            carts: true,
            schedules: true,
            reviews: true,
        }
    });
    if (!service) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Service did not found");
    }
    return service;
});
// Update service by id
const updateServiceById = (payload, data) => __awaiter(void 0, void 0, void 0, function* () {
    // Check service name and category is match or not
    if (data.category === Painting_constants_1.ENUM_SERVICE_CATEGORY.FURNITURE_PAINTING && !Painting_constants_1.furniturePaintName.includes(data.name)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This service, we don't provide");
    }
    if (data.category === Painting_constants_1.ENUM_SERVICE_CATEGORY.HOME_PAINTING && !Painting_constants_1.homePaintName.includes(data.name)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This service, we don't provide");
    }
    if (data.category === Painting_constants_1.ENUM_SERVICE_CATEGORY.OFFICE_PAINTING && !Painting_constants_1.officePaintName.includes(data.name)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This service, we don't provide");
    }
    if (data.category === Painting_constants_1.ENUM_SERVICE_CATEGORY.SHOP_PAINTING && !Painting_constants_1.shopPaintName.includes(data.name)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This service, we don't provide");
    }
    // Check service is exist or not
    const isServiceExist = yield prisma_1.default.service.findUnique({
        where: {
            name: data.name
        }
    });
    if (isServiceExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Service already exist");
    }
    // Update service data
    const service = yield prisma_1.default.service.update({
        where: {
            id: payload
        },
        data
    });
    if (!service) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Service did not found");
    }
    return service;
});
// Delete service by id
const deleteServiceById = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield prisma_1.default.service.delete({
        where: {
            id: payload
        }
    });
    if (!service) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Service did not found");
    }
    return service;
});
exports.PaintingService = {
    createService,
    getAllServices,
    getServiceById,
    updateServiceById,
    deleteServiceById
};
//# sourceMappingURL=Painting.service.js.map