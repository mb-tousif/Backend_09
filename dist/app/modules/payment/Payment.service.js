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
exports.PaymentService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ssl_service_1 = require("../ssl/ssl.service");
const Payment_constants_1 = require("./Payment.constants");
// Post Payment data to database
const createPayment = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check user is blocked or not
    const isActive = yield prisma_1.default.user.findFirst({
        where: {
            id: user === null || user === void 0 ? void 0 : user.id,
        },
    });
    if ((isActive === null || isActive === void 0 ? void 0 : isActive.status) === "Blocked" || (isActive === null || isActive === void 0 ? void 0 : isActive.status) === "Inactive") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User is blocked or inactive");
    }
    ;
    const transactionId = `${payload.cartId.slice(0, 4)}-${payload.serviceId.slice(0, 4)}-${payload.amount}-${new Date().getTime()}`;
    const paymentSession = yield ssl_service_1.sslService.initPayment({
        total_amount: payload.amount,
        tran_id: transactionId,
        cus_name: isActive === null || isActive === void 0 ? void 0 : isActive.name,
        cus_email: isActive === null || isActive === void 0 ? void 0 : isActive.email,
        cus_add1: isActive === null || isActive === void 0 ? void 0 : isActive.address,
        cus_phone: isActive === null || isActive === void 0 ? void 0 : isActive.contact,
    });
    const result = yield prisma_1.default.payment.create({
        data: {
            userId: user === null || user === void 0 ? void 0 : user.id,
            cartId: payload.cartId,
            serviceId: payload.serviceId,
            amount: payload.amount,
            transactionId: transactionId,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Payment did not created");
    }
    return paymentSession.redirectGatewayURL;
});
// Validate Payment status
const validatePaymentStatus = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload || !(payload === null || payload === void 0 ? void 0 : payload.status) || (payload === null || payload === void 0 ? void 0 : payload.status) !== 'VALID') {
        return {
            massage: 'Invalid Payment!'
        };
    }
    const result = yield ssl_service_1.sslService.validate(payload);
    if ((result === null || result === void 0 ? void 0 : result.status) !== 'VALID') {
        return {
            massage: 'Payment failed'
        };
    }
    const { tran_id } = result;
    yield prisma_1.default.payment.updateMany({
        where: {
            transactionId: tran_id
        },
        data: {
            status: "Paid",
            paymentGatewayData: payload
        }
    });
    return {
        massage: 'Payment Success'
    };
});
// Get all Payments
const getAllPayments = (options, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle pagination
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // Handle search
    const { search } = payload, filterData = __rest(payload, ["search"]);
    const andCondition = [];
    if (search) {
        andCondition.push({
            OR: Payment_constants_1.PaymentSearchAbleField.map((field) => ({
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
    const result = yield prisma_1.default.payment.findMany({
        where: whereQuery,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            users: true,
            carts: true,
            notifications: true,
        },
    });
    if (result.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Payment did not found");
    }
    const count = yield prisma_1.default.payment.count({
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
// Get Payment by id
const getPaymentById = (paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.payment.findUnique({
        where: {
            id: paymentId,
        },
        include: {
            users: true,
            carts: true,
            notifications: true,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Payment did not found");
    }
    return result;
});
// Update Payment by id
const updatePaymentById = (paymentId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle Payment is already completed
    const isCompletedOrRefunded = yield prisma_1.default.payment.findFirst({
        where: {
            id: paymentId,
            status: "Paid" || "Refunded",
        },
    });
    if (isCompletedOrRefunded) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Payment already completed or refunded, now you can not update it");
    }
    if (payload.status !== "Pending" && payload.amount > 0) {
        yield prisma_1.default.notification.create({
            data: {
                userId: payload.userId,
                cartId: payload.cartId,
                paymentId: paymentId,
                message: `Your payment amount is ${payload.amount} and status ${payload.status}`,
            },
        });
    }
    const result = yield prisma_1.default.payment.update({
        where: {
            id: paymentId,
        },
        data: {
            status: payload.status,
            amount: payload.amount,
        },
        include: {
            users: true,
            carts: true,
            notifications: true,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Payment did not found");
    }
    return result;
});
// Delete Payment by id
const deletePaymentById = (PaymentId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.payment.delete({
        where: {
            id: PaymentId,
        },
        include: {
            users: true,
            carts: true,
            notifications: true,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Payment did not found");
    }
    return result;
});
exports.PaymentService = {
    createPayment,
    validatePaymentStatus,
    getAllPayments,
    getPaymentById,
    updatePaymentById,
    deletePaymentById,
};
//# sourceMappingURL=Payment.service.js.map