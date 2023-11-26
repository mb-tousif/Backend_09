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
exports.BlogsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const Blogs_constants_1 = require("./Blogs.constants");
// Post Blogs data to database
const createBlogs = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check user is blocked or not
    const isActive = yield prisma_1.default.user.findFirst({
        where: {
            id: user === null || user === void 0 ? void 0 : user.id,
        },
    });
    if ((isActive === null || isActive === void 0 ? void 0 : isActive.status) === "Blocked" || (isActive === null || isActive === void 0 ? void 0 : isActive.status) === "Inactive") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User is blocked or inactive");
    }
    // Check Blogs is already exist with same user and service
    const isExist = yield prisma_1.default.blogs.findFirst({
        where: {
            title: payload.title,
        },
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Blogs is already exist");
    }
    const result = yield prisma_1.default.blogs.create({
        data: {
            userId: user === null || user === void 0 ? void 0 : user.id,
            title: payload.title,
            content: payload.content,
            imgUrl: payload.imgUrl,
        }
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Blogs did not created");
    }
    return result;
});
// Get all Blogs
const getAllBlogs = (options, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle pagination
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // Handle search
    const { search } = payload, filterData = __rest(payload, ["search"]);
    const andCondition = [];
    if (search) {
        andCondition.push({
            OR: Blogs_constants_1.BlogsSearchAbleField.map((field) => ({
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
    const result = yield prisma_1.default.blogs.findMany({
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
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Blogs did not found");
    }
    const count = yield prisma_1.default.blogs.count({
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
// Get Blogs by id
const getBlogsById = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blogs.findUnique({
        where: {
            id: blogId,
        },
        include: {
            users: true,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Blogs did not found");
    }
    return result;
});
// Update Blogs by id
const updateBlogsById = (blogId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.blogs.findUnique({
        where: {
            id: blogId,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Blogs is not exist");
    }
    const result = yield prisma_1.default.blogs.update({
        where: {
            id: blogId,
        },
        data: payload,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Blogs did not found");
    }
    return result;
});
// Delete Blogs by id
const deleteBlogsById = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blogs.delete({
        where: {
            id: blogId,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Blogs did not found");
    }
    return result;
});
exports.BlogsService = {
    createBlogs,
    getAllBlogs,
    getBlogsById,
    updateBlogsById,
    deleteBlogsById,
};
//# sourceMappingURL=Blogs.service.js.map