import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { BookingFilterAbleField } from "./Booking.constants";
import { BookingService } from "./Booking.service";

// Create and Save new Booking
const createBooking = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;  
  const {...payload} = req.body;
    const result = await BookingService.createBooking( user, payload);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Booking created successfully",
      data: result,
    });
})

// Retrieve all Bookings from the database.
const getAllBookings = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, paginationFields);
    const payload = pick(req.query, BookingFilterAbleField);
    const result = await BookingService.getAllBookings( options, payload );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking list fetched successfully",
      data: result,
    });
});

// get all bookings by user id
const getAllBookingByUserId = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const data = await BookingService.getBookingByUserId(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking list fetched successfully",
    data: data,
  });
}
);

// Find a single Booking with an id
const getBookingById = catchAsync(async (req: Request, res: Response) => {
    const bookingId = req.params.id;
    const result = await BookingService.getBookingById(bookingId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking fetched successfully",
      data: result,
    });
});

// Update a Booking by id
const updateBookingById = catchAsync(async (req: Request, res: Response) => {
    const bookingId = req.params.id;
    const payload = req.body;
    const result = await BookingService.updateBookingById(bookingId, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking updated successfully",
      data: result,
    });
});

// Delete a Booking with the specified id 
const deleteBookingById = catchAsync(async (req: Request, res: Response) => {
    const bookingId = req.params.id;
    const result = await BookingService.deleteBookingById(bookingId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking deleted successfully",
      data: result,
    });
});

export const BookingController = {
    createBooking,
    getAllBookings,
    getAllBookingByUserId,
    getBookingById,
    updateBookingById,
    deleteBookingById,
};
