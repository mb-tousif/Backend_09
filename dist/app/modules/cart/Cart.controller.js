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
exports.CartController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const Cart_constants_1 = require("./Cart.constants");
const Cart_service_1 = require("./Cart.service");
// Post Cart data to database
const createCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const payload = __rest(req.body, []);
    const result = yield Cart_service_1.CartService.createCart(user, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Cart created successfully",
        data: result,
    });
}));
// Get all Carts
const getAllCarts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const payload = (0, pick_1.default)(req.query, Cart_constants_1.cartFilterableFields);
    const result = yield Cart_service_1.CartService.getAllCarts(options, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Fetched all carts",
        data: result,
    });
}));
// Get Carts by user id
const getCartsByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const options = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const payload = (0, pick_1.default)(req.query, Cart_constants_1.cartFilterableFields);
    const result = yield Cart_service_1.CartService.getCartsByUserId(user, options, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Fetched carts by user id",
        data: result,
    });
}));
// Get Cart by id
const getCartById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.id;
    const result = yield Cart_service_1.CartService.getCartById(cartId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Fetched cart by id",
        data: result,
    });
}));
// increment Cart quantity by id
const incrementCartQuantity = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.id;
    const result = yield Cart_service_1.CartService.incrementCartQuantity(cartId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cart quantity incremented successfully",
        data: result,
    });
}));
// decrement Cart quantity by id
const decrementCartQuantity = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.id;
    const result = yield Cart_service_1.CartService.decrementCartQuantity(cartId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cart quantity decremented successfully",
        data: result,
    });
}));
// Update Cart by id
const updateCartById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.id;
    const payload = req.body;
    const result = yield Cart_service_1.CartService.updateCartById(cartId, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cart updated successfully",
        data: result,
    });
}));
// Delete Cart by id
const deleteCartById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.id;
    const result = yield Cart_service_1.CartService.deleteCartById(cartId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cart deleted successfully",
        data: result,
    });
}));
exports.CartController = {
    createCart,
    getAllCarts,
    getCartById,
    getCartsByUserId,
    updateCartById,
    incrementCartQuantity,
    decrementCartQuantity,
    deleteCartById
};
//# sourceMappingURL=Cart.controller.js.map