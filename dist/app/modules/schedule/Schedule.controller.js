"use strict";
// import { Request, Response } from "express";
// import httpStatus from "http-status";
// import { paginationFields } from "../../../constants/pagination";
// import catchAsync from "../../../shared/catchAsync";
// import pick from "../../../shared/pick";
// import sendResponse from "../../../shared/sendResponse";
// import { ScheduleFilterAbleField } from "./Schedule.constants";
// import { ScheduleService } from "./Schedule.service";
// // Create and Save new Schedule
// const createSchedule = catchAsync(async (req: Request, res: Response) => {
//     const payload = req.body;
//     const result = await ScheduleService.createSchedule(payload);
//     sendResponse(res, {
//       statusCode: httpStatus.CREATED,
//       success: true,
//       message: "Schedule created successfully",
//       data: result,
//     });
// })
// // Retrieve all Schedules from the database.
// const getAllSchedules = catchAsync(async (req: Request, res: Response) => {
//     const options = pick(req.query, paginationFields);
//     const payload = pick(req.query, ScheduleFilterAbleField);
//     const result = await ScheduleService.getAllSchedules( options, payload );
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Schedule list fetched successfully",
//       data: result,
//     });
// });
// // Find a single Schedule with an id
// const getScheduleById = catchAsync(async (req: Request, res: Response) => {
//     const ScheduleId = req.params.id;
//     const result = await ScheduleService.getScheduleById(ScheduleId);
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Schedule fetched successfully",
//       data: result,
//     });
// });
// // Update a Schedule by id
// const updateScheduleById = catchAsync(async (req: Request, res: Response) => {
//     const ScheduleId = req.params.id;
//     const payload = req.body;
//     const result = await ScheduleService.updateScheduleById(ScheduleId, payload);
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Schedule updated successfully",
//       data: result,
//     });
// });
// // Delete a Schedule with the specified id 
// const deleteScheduleById = catchAsync(async (req: Request, res: Response) => {
//     const ScheduleId = req.params.id;
//     const result = await ScheduleService.deleteScheduleById(ScheduleId);
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Schedule deleted successfully",
//       data: result,
//     });
// });
// export const ScheduleController = {
//     createSchedule,
//     getAllSchedules,
//     getScheduleById,
//     updateScheduleById,
//     deleteScheduleById,
// };
//# sourceMappingURL=Schedule.controller.js.map