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
exports.NotificationService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const Notification_constants_1 = require("./Notification.constants");
// Post Notification data to database
const createNotification = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check user is blocked or not
    const isActive = yield prisma_1.default.user.findFirst({
        where: {
            id: user === null || user === void 0 ? void 0 : user.id,
        },
    });
    if ((isActive === null || isActive === void 0 ? void 0 : isActive.status) === "Blocked" || (isActive === null || isActive === void 0 ? void 0 : isActive.status) === "Inactive") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User is blocked or inactive");
    }
    const result = yield prisma_1.default.notification.create({
        data: {
            userId: user === null || user === void 0 ? void 0 : user.id,
            message: payload.message,
            paymentId: payload.paymentId || null,
            bookingId: payload.bookingId || null,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Notification did not created");
    }
    return result;
});
// Get all Notifications
const getAllNotifications = (options, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle pagination
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // Handle search
    const { search } = payload, filterData = __rest(payload, ["search"]);
    const andCondition = [];
    if (search) {
        andCondition.push({
            OR: Notification_constants_1.NotificationSearchAbleField.map((field) => ({
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
    const result = yield prisma_1.default.notification.findMany({
        where: whereQuery,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            users: true,
            bookings: true,
            payments: true,
        },
    });
    if (result.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Notification did not found");
    }
    const count = yield prisma_1.default.notification.count({
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
// Get Notification by id
const getNotificationById = (notificationId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.notification.findUnique({
        where: {
            id: notificationId,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Notification did not found");
    }
    return result;
});
// Get Notification by userId
const getNotificationByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.notification.findMany({
        where: {
            userId: userId,
        },
        include: {
            users: true,
            bookings: true,
            payments: true,
        }
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Notification did not found");
    }
    return result;
});
// Update Notification by id
const updateNotificationById = (notificationId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.notification.update({
        where: {
            id: notificationId,
        },
        data: payload,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Notification did not found");
    }
    return result;
});
// Delete Notification by id
const deleteNotificationById = (notificationId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.notification.delete({
        where: {
            id: notificationId,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Notification did not found");
    }
    return result;
});
exports.NotificationService = {
    createNotification,
    getAllNotifications,
    getNotificationByUserId,
    getNotificationById,
    updateNotificationById,
    deleteNotificationById,
};
//# sourceMappingURL=Notification.service.js.map