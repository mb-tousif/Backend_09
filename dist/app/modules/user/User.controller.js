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
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const pagination_1 = require("../../../constants/pagination");
const common_1 = require("../../../enums/common");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const User_constants_1 = require("./User.constants");
const User_service_1 = require("./User.service");
// Get All users
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const filterOptions = (0, pick_1.default)(req.query, User_constants_1.userFilterableFields);
    const result = yield User_service_1.UserService.getAllUsers(options, filterOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Get all users successfully",
        data: result,
    });
}));
// Get user profile by id
const getProfileById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.params.id;
    const token = req.headers.authorization;
    // Handle case user get profile another user
    const decodedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (decodedToken.role === common_1.ENUM_USER_ROLE.USER && decodedToken.id !== payload) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "You can get only your profile.");
    }
    const result = yield User_service_1.UserService.getProfileById(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Get profile successfully",
        data: result,
    });
}));
// Update user profile by id
const updateProfileById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.params.id;
    const token = req.headers.authorization;
    const data = req.body;
    // Handle case user get profile another user
    const decodedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (decodedToken.role === common_1.ENUM_USER_ROLE.USER &&
        decodedToken.id !== payload) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "You can update only your profile.");
    }
    const result = yield User_service_1.UserService.updateProfileById(payload, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Update profile successfully",
        data: result,
    });
}));
// Delete user by id
const deleteUserById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.params.id;
    const result = yield User_service_1.UserService.deleteUserById(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Delete user successfully",
        data: result,
    });
}));
exports.UserController = {
    getAllUsers,
    getProfileById,
    updateProfileById,
    deleteUserById,
};
//# sourceMappingURL=User.controller.js.map