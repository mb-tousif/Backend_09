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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const common_1 = require("../../../enums/common");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const hashPasswordHelper_1 = require("../../../helpers/hashPasswordHelper");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Create user in database
const signupUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // handle if user role is Admin or Super_admin
    if (payload.role === common_1.ENUM_USER_ROLE.ADMIN || payload.role === common_1.ENUM_USER_ROLE.SUPER_ADMIN) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User can not create Admin or Super_admin');
    }
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
// Login user
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle if user already not exist
    const isUserExist = yield prisma_1.default.user.findFirst({
        where: {
            email: payload.email,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User not exist');
    }
    // Compare password
    const isPasswordMatch = yield hashPasswordHelper_1.hashPasswordHelper.comparePassword(payload.password, isUserExist.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Password not match');
    }
    // Generate token
    const token = yield jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExist.id,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    // Refresh token
    const refreshToken = yield jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExist.id,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.refresh_expires_in);
    // Check decodedToken
    // const decodedToken = await jwtHelpers.verifyToken(token, config.jwt.secret as string);
    // console.log(decodedToken);
    return {
        token,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { userId } = verifiedToken;
    const isUserExist = yield prisma_1.default.user.findFirst({
        where: {
            id: userId,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExist.id,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    signupUser,
    loginUser,
    refreshToken,
};
//# sourceMappingURL=Auth.service.js.map