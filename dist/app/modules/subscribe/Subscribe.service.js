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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Post Subscribe data to database
const createSubscribe = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check Subscribe is already exist with same user and service
    const isExist = yield prisma_1.default.subscribe.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You already subscribed this service");
    }
    const result = yield prisma_1.default.subscribe.create({
        data: payload,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Subscribe did not created");
    }
    return result;
});
// Get all Subscribes
const getAllSubscribes = (options) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle pagination
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // get all subscribes
    const result = yield prisma_1.default.subscribe.findMany({
        take: limit,
        skip: skip,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    // get count of all subscribes
    const count = yield prisma_1.default.subscribe.count();
    return {
        meta: {
            page,
            limit,
            total: count,
        },
        data: result,
    };
});
// Get Subscribe by id
const getSubscribeById = (SubscribeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.subscribe.findUnique({
        where: {
            id: SubscribeId,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Subscribe did not found");
    }
    return result;
});
// Delete Subscribe by id
const deleteSubscribeById = (subscribeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.subscribe.delete({
        where: {
            id: subscribeId,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Subscribe did not found");
    }
    return result;
});
exports.SubscribeService = {
    createSubscribe,
    getAllSubscribes,
    deleteSubscribeById,
};
//# sourceMappingURL=Subscribe.service.js.map