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
exports.ScheduleService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const Schedule_constants_1 = require("./Schedule.constants");
// Post Schedule data to database
const createSchedule = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle duplicate Schedule Data
    const isExist = yield prisma_1.default.schedule.findFirst({
        where: {
            bookingId: payload.bookingId,
            serviceId: payload.serviceId,
        },
    });
    if ((isExist === null || isExist === void 0 ? void 0 : isExist.status) === Schedule_constants_1.ENUM_SCHEDULE_STATUS.PENDING) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Schedule is already exist with pending status");
    }
    const Schedule = yield prisma_1.default.schedule.create({
        data: payload,
    });
    if (!Schedule) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Schedule did not created");
    }
    return Schedule;
});
// Get all Schedules
const getAllSchedules = (options, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle pagination
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // Handle search
    const { search } = payload, filterData = __rest(payload, ["search"]);
    const andCondition = [];
    if (search) {
        andCondition.push({
            OR: Schedule_constants_1.ScheduleSearchAbleField.map((field) => ({
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
    const result = yield prisma_1.default.schedule.findMany({
        where: whereQuery,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            bookings: true,
            services: true,
        },
    });
    if (result.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Schedule did not found");
    }
    const count = yield prisma_1.default.schedule.count({
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
// Get Schedule by id
const getScheduleById = (ScheduleId) => __awaiter(void 0, void 0, void 0, function* () {
    const Schedule = yield prisma_1.default.schedule.findUnique({
        where: {
            id: ScheduleId,
        },
    });
    if (!Schedule) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Schedule did not found");
    }
    return Schedule;
});
// Update Schedule by id
const updateScheduleById = (scheduleId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle Schedule is already completed
    const isCompleted = yield prisma_1.default.schedule.findFirst({
        where: {
            id: scheduleId,
            status: "Completed",
        },
        include: {
            bookings: true,
        },
    });
    if (isCompleted) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Schedule already completed now you can not update it");
    }
    const result = yield prisma_1.default.schedule.update({
        where: {
            id: scheduleId,
        },
        data: payload,
        include: {
            bookings: true,
        },
    });
    // Handle Schedule notification if status is changed
    if (payload.status !== "Pending") {
        yield prisma_1.default.notification.create({
            data: {
                message: `Your Schedule status is changed to ${payload.status}`,
                bookingId: payload.bookingId,
                userId: result.bookings.userId,
            },
        });
    }
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Schedule did not found");
    }
    return result;
});
// Delete Schedule by id
const deleteScheduleById = (ScheduleId) => __awaiter(void 0, void 0, void 0, function* () {
    const Schedule = yield prisma_1.default.schedule.delete({
        where: {
            id: ScheduleId,
        },
    });
    if (!Schedule) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Schedule did not found");
    }
    return Schedule;
});
exports.ScheduleService = {
    createSchedule,
    getAllSchedules,
    getScheduleById,
    updateScheduleById,
    deleteScheduleById,
};
//# sourceMappingURL=Schedule.service.js.map