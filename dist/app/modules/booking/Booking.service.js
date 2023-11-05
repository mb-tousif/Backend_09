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
exports.BookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const Cart_constants_1 = require("../cart/Cart.constants");
const Booking_constants_1 = require("./Booking.constants");
// Post Booking data to database
const createBooking = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle user is blocked or not
    const isActive = yield prisma_1.default.user.findFirst({
        where: {
            id: user === null || user === void 0 ? void 0 : user.id,
        },
    });
    if ((isActive === null || isActive === void 0 ? void 0 : isActive.status) === "Blocked" || (isActive === null || isActive === void 0 ? void 0 : isActive.status) === "Inactive") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User is blocked or inactive");
    }
    // Handle Cart data if service status is not available
    const serviceStatus = yield prisma_1.default.service.findFirst({
        where: {
            id: payload.serviceId,
        },
    });
    if ((serviceStatus === null || serviceStatus === void 0 ? void 0 : serviceStatus.status) !== "Available") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Service is not available for booking");
    }
    // Handle duplicate booking Data
    const booking = yield prisma_1.default.booking.create({
        data: {
            userId: user === null || user === void 0 ? void 0 : user.id,
            serviceId: payload.serviceId,
            cartId: payload.cartId,
            schedule: payload.schedule,
        },
    });
    if (!booking) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Booking did not created");
    }
    return booking;
});
// Get all Bookings
const getAllBookings = (options, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle pagination
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // Handle search
    const { search } = payload, filterData = __rest(payload, ["search"]);
    const andCondition = [];
    if (search) {
        andCondition.push({
            OR: Booking_constants_1.BookingFilterAbleField.map((field) => ({
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
    const result = yield prisma_1.default.booking.findMany({
        where: whereQuery,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            users: true,
            services: true,
        },
    });
    if (result.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Booking did not found");
    }
    const count = yield prisma_1.default.booking.count({
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
const getBookingByUserId = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.findMany({
        where: {
            userId: user === null || user === void 0 ? void 0 : user.id,
        },
        include: {
            services: true,
        },
    });
    if (!booking) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Booking did not found");
    }
    return booking;
});
// Get Booking by id
const getBookingById = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.findUnique({
        where: {
            id: bookingId,
        },
        include: {
            users: true,
            services: true,
        },
    });
    if (!booking) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Booking did not found");
    }
    return booking;
});
// Update Booking by id
const updateBookingById = (bookingId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle Booking is already completed
    const isCompleted = yield prisma_1.default.booking.findFirst({
        where: {
            id: bookingId,
            status: "Completed",
        },
    });
    if (isCompleted) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Booking already completed now you can not update it");
    }
    const booking = yield prisma_1.default.booking.update({
        where: {
            id: bookingId,
        },
        data: payload,
    });
    if (!booking) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Booking did not found");
    }
    return booking;
});
// Update Booking status by user
const changeBookingStatusByUser = (bookingId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingStatus = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // Handle Booking is already completed
        const isCompleted = yield transactionClient.booking.findFirst({
            where: {
                id: bookingId,
            },
        });
        if ((isCompleted === null || isCompleted === void 0 ? void 0 : isCompleted.status) === "Completed") {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Booking already completed now you can not update it");
        }
        // Cancelled by user
        if (payload.status === "Cancelled") {
            yield transactionClient.cart.update({
                where: {
                    id: isCompleted === null || isCompleted === void 0 ? void 0 : isCompleted.cartId,
                },
                data: {
                    status: Cart_constants_1.CART_STATUS.CANCELLED,
                },
            });
        }
        if (payload.status === "Confirmed") {
            yield transactionClient.cart.update({
                where: {
                    id: isCompleted === null || isCompleted === void 0 ? void 0 : isCompleted.cartId,
                },
                data: {
                    status: Cart_constants_1.CART_STATUS.BOOKED,
                },
            });
        }
        const booking = yield transactionClient.booking.update({
            where: {
                id: bookingId,
            },
            data: payload,
            include: {
                users: true,
                services: true,
            },
        });
        if (!booking) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Booking did not found");
        }
        return booking;
    }));
    return bookingStatus;
});
// Update Booking status by management
const changeBookingStatusByManagement = (bookingId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle Booking is already completed
    const isCompleted = yield prisma_1.default.booking.findFirst({
        where: {
            id: bookingId,
            status: "Completed",
        },
    });
    if (isCompleted) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Booking already completed now you can not update it");
    }
    const booking = yield prisma_1.default.booking.update({
        where: {
            id: bookingId,
        },
        data: payload,
        include: {
            users: true,
            services: true,
        },
    });
    if (!booking) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Booking did not found");
    }
    return booking;
});
// Delete Booking by id
const deleteBookingById = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const isExist = yield transactionClient.booking.findFirst({
            where: {
                id: bookingId,
            },
        });
        if (!isExist) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Booking did not found");
        }
        // delete cart
        const deleteCart = yield transactionClient.cart.delete({
            where: {
                id: isExist.cartId,
            },
        });
        if (!deleteCart) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cart did not deleted");
        }
        const deleBooking = yield transactionClient.booking.delete({
            where: {
                id: bookingId,
            },
        });
        if (!deleBooking) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Booking did not found");
        }
        return deleBooking;
    }));
    return booking;
});
exports.BookingService = {
    createBooking,
    getAllBookings,
    getBookingByUserId,
    getBookingById,
    updateBookingById,
    deleteBookingById,
    changeBookingStatusByUser,
    changeBookingStatusByManagement,
};
//# sourceMappingURL=Booking.service.js.map