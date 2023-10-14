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
exports.FeedbackService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const Feedback_constants_1 = require("./Feedback.constants");
// Post Feedback data to database
const createFeedback = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check user is blocked or not
    const isActive = yield prisma_1.default.user.findFirst({
        where: {
            id: payload.userId,
        },
    });
    if ((isActive === null || isActive === void 0 ? void 0 : isActive.status) === "Blocked" || (isActive === null || isActive === void 0 ? void 0 : isActive.status) === "Inactive") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User is blocked or inactive");
    }
    const result = yield prisma_1.default.feedback.create({
        data: payload,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Feedback did not created");
    }
    return result;
});
// Get all Feedbacks
const getAllFeedbacks = (options, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle pagination
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // Handle search
    const { search } = payload, filterData = __rest(payload, ["search"]);
    const andCondition = [];
    if (search) {
        andCondition.push({
            OR: Feedback_constants_1.FeedbackSearchAbleField.map((field) => ({
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
                    equals: filterData[field],
                },
            })),
        });
    }
    const whereQuery = andCondition.length > 0 ? { AND: andCondition } : {};
    const result = yield prisma_1.default.feedback.findMany({
        where: whereQuery,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            users: true,
        },
    });
    if (result.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Feedback did not found");
    }
    const count = yield prisma_1.default.feedback.count({
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
});
// Get Feedback by id
const getFeedbackById = (FeedbackId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedback.findUnique({
        where: {
            id: FeedbackId,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Feedback did not found");
    }
    return result;
});
// Update Feedback by id
const updateFeedbackById = (FeedbackId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedback.update({
        where: {
            id: FeedbackId,
        },
        data: payload,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Feedback did not found");
    }
    return result;
});
// Delete Feedback by id
const deleteFeedbackById = (FeedbackId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedback.delete({
        where: {
            id: FeedbackId,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Feedback did not found");
    }
    return result;
});
exports.FeedbackService = {
    createFeedback,
    getAllFeedbacks,
    getFeedbackById,
    updateFeedbackById,
    deleteFeedbackById,
};
//# sourceMappingURL=Feedback.service.js.map