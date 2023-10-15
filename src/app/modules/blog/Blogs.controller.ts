
import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { BlogsFilterAbleField } from "./Blogs.constants";
import { BlogsService } from "./Blogs.service";

// Create and Save new Blogs
const createBlogs = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const {...payload} = req.body;
    const result = await BlogsService.createBlogs( user, payload);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Blogs created successfully",
      data: result,
    });
})

// Retrieve all Blogs from the database.
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, paginationFields);
    const payload = pick(req.query, BlogsFilterAbleField);
    const result = await BlogsService.getAllBlogs( options, payload );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blogs list fetched successfully",
      data: result,
    });
});

// Find a single Blogs with an id
const getBlogsById = catchAsync(async (req: Request, res: Response) => {
    const BlogsId = req.params.id;
    const result = await BlogsService.getBlogsById(BlogsId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blogs fetched successfully",
      data: result,
    });
});

// Update a Blogs by id
const updateBlogsById = catchAsync(async (req: Request, res: Response) => {
    const BlogsId = req.params.id;
    const payload = req.body;
    const result = await BlogsService.updateBlogsById(BlogsId, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blogs updated successfully",
      data: result,
    });
});

// Delete a Blogs with the specified id 
const deleteBlogsById = catchAsync(async (req: Request, res: Response) => {
    const BlogsId = req.params.id;
    const result = await BlogsService.deleteBlogsById(BlogsId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blogs deleted successfully",
      data: result,
    });
});

export const BlogsController = {
    createBlogs,
    getAllBlogs,
    getBlogsById,
    updateBlogsById,
    deleteBlogsById,
};

