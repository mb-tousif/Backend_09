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
exports.CartService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const Cart_constants_1 = require("./Cart.constants");
// Post Cart data to database
const createCart = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check Cart is already exist with same user and service
    const isExist = yield prisma_1.default.cart.findFirst({
        where: {
            userId: payload.userId,
            serviceId: payload.serviceId
        }
    });
    // Check user is blocked or not
    const isActive = yield prisma_1.default.user.findFirst({
        where: {
            id: payload.userId,
        },
    });
    if ((isActive === null || isActive === void 0 ? void 0 : isActive.status) === "Blocked" || (isActive === null || isActive === void 0 ? void 0 : isActive.status) === "Inactive") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User is blocked or inactive");
    }
    ;
    // Check Cart total price is greater same as service price
    const service = yield prisma_1.default.service.findUnique({
        where: {
            id: payload.serviceId
        }
    });
    if (!service) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Service did not found");
    }
    if (payload.totalPrice < service.price) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Cart total price is not match service price");
    }
    if (isExist) {
        const result = yield prisma_1.default.cart.update({
            where: {
                id: isExist.id
            },
            data: {
                quantity: {
                    increment: payload.quantity || 1
                },
                totalPrice: {
                    increment: payload.totalPrice
                }
            },
        });
        return result;
    }
    // Posting Cart data to database
    const result = yield prisma_1.default.cart.create({
        data: payload
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Cart is not created");
    }
    return result;
});
// Get all Carts
const getAllCarts = (options, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle pagination, custom query, search and filtration
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // Handle search and filter
    const { search } = payload, filterData = __rest(payload, ["search"]);
    const andCondition = [];
    if (search) {
        andCondition.push({
            OR: Cart_constants_1.cartSearchableFields.map((field) => ({
                [field.toString()]: {
                    contains: search,
                    mode: "insensitive",
                },
            })),
        });
    }
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
    const result = yield prisma_1.default.cart.findMany({
        where: whereQuery,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            users: true,
            services: true
        },
    });
    if (result.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cart did not found");
    }
    const count = yield prisma_1.default.cart.count({
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
// Get Cart by id
const getCartById = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.findUnique({
        where: {
            id: payload
        },
        include: {
            users: true,
            services: true
        }
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Cart did not found");
    }
    return result;
});
// Update Cart by id
const updateCartById = (payload, data) => __awaiter(void 0, void 0, void 0, function* () {
    // Update Cart data
    const result = yield prisma_1.default.cart.update({
        where: {
            id: payload
        },
        data
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Cart did not found");
    }
    return result;
});
// Delete Cart by id
const deleteCartById = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.delete({
        where: {
            id: payload
        }
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Cart did not found");
    }
    return result;
});
exports.CartService = {
    createCart,
    getAllCarts,
    getCartById,
    updateCartById,
    deleteCartById
};
//# sourceMappingURL=Cart.service.js.map