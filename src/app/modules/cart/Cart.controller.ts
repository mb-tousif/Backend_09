import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { cartFilterableFields } from "./Cart.constants";
import { CartService } from "./Cart.service";
// Post Cart data to database
const createCart = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const { ...payload} = req.body;
    const result = await CartService.createCart( user, payload);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Cart created successfully",
      data: result,
    });
})

// Get all Carts
const getAllCarts = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, paginationFields);
    const payload = pick(req.query, cartFilterableFields);
    const result = await CartService.getAllCarts( options, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Fetched all carts",
      data: result,
    });
});

// Get Carts by user id
const getCartsByUserId = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const options = pick(req.query, paginationFields);
    const payload = pick(req.query, cartFilterableFields);
    const result = await CartService.getCartsByUserId( userId, options, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Fetched carts by user id",
      data: result,
    });
});

// Get Cart by id
const getCartById = catchAsync(async (req: Request, res: Response) => {
    const cartId = req.params.id;
    const result = await CartService.getCartById(cartId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Fetched cart by id",
      data: result,
    });
});

// Update Cart by id
const updateCartById = catchAsync(async (req: Request, res: Response) => {
    const cartId = req.params.id;
    const payload = req.body;
    const result = await CartService.updateCartById(cartId, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cart updated successfully",
      data: result,
    });
});

// Delete Cart by id
const deleteCartById = catchAsync(async (req: Request, res: Response) => {
    const cartId = req.params.id;
    const result = await CartService.deleteCartById(cartId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cart deleted successfully",
      data: result,
    });
});

export const CartController = {
    createCart,
    getAllCarts,
    getCartById,
    getCartsByUserId,
    updateCartById,
    deleteCartById
};
