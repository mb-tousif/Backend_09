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
exports.SuperAdminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const hashPasswordHelper_1 = require("../../../helpers/hashPasswordHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Create user in database
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle if user already exist
    const isExistUser = yield prisma_1.default.user.findFirst({
        where: {
            email: payload.email,
        },
    });
    if (isExistUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User already exist');
    }
    // Hashing password
    payload.password = yield hashPasswordHelper_1.hashPasswordHelper.hashPassword(payload.password);
    const user = yield prisma_1.default.user.create({
        data: payload,
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
// Update user by id
const updateUserById = (payload, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.user.findUnique({
        where: {
            id: payload,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User did not found to update");
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
exports.SuperAdminService = {
    createAdmin,
    updateUserById,
};
//# sourceMappingURL=SuperAdmin.service.js.map