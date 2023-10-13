import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CartService } from "./Cart.service";

// Post Cart data to database
const createCart = catchAsync(async (req: Request, res: Response) => {
     const payload = req.body;
    const result = await CartService.createCart(payload);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Cart created successfully",
      data: result,
    });
})

// Get all Carts
const getAllCarts = catchAsync(async (req: Request, res: Response) => {
    const options = req.query;
    const payload = req.query;
    const result = await CartService.getAllCarts( options, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Fetched all carts",
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
    updateCartById,
    deleteCartById
};
