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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const hashPasswordHelper_1 = require("../../../helpers/hashPasswordHelper");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const User_constants_1 = require("./User.constants");
// Get All users
const getAllUsers = (options, filterOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle pagination
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // Handle search and filter
    const { search } = filterOptions, filterData = __rest(filterOptions, ["search"]);
    const andCondition = [];
    if (search) {
        andCondition.push({
            OR: User_constants_1.userSearchableFields.map((field) => ({
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
    const users = yield prisma_1.default.user.findMany({
        where: whereQuery,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            contact: true,
            address: true,
            imgUrl: true,
        },
    });
    if (users.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const count = yield prisma_1.default.user.count({
        where: whereQuery,
    });
    return {
        meta: {
            page,
            limit,
            total: count,
        },
        data: users,
    };
});
// Get user profile by id
const getProfileById = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: payload,
        },
        include: {
            bookings: true,
            reviews: true,
            carts: true,
            blogs: true,
            feedbacks: true,
            notifications: true,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    return user;
});
// Update user profile by id
const updateProfileById = (payload, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.user.findUnique({
        where: {
            id: payload,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User did not found to update");
    }
    // hash password if user update password field
    if (data.password && data.password.length > 0) {
        data.password = yield hashPasswordHelper_1.hashPasswordHelper.hashPassword(data.password);
    }
    const user = yield prisma_1.default.user.update({
        where: {
            id: payload,
        },
        data: data,
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            contact: true,
            address: true,
            imgUrl: true,
        },
    });
    return user;
});
// Delete user by id
const deleteUserById = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.user.findUnique({
        where: {
            id: payload,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User did not found to delete");
    }
    const user = yield prisma_1.default.user.delete({
        where: {
            id: payload,
        },
    });
    return user;
});
exports.UserService = {
    getAllUsers,
    getProfileById,
    updateProfileById,
    deleteUserById,
};
//# sourceMappingURL=User.service.js.map