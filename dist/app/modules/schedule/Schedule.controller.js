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
exports.ScheduleController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const Schedule_constants_1 = require("./Schedule.constants");
const Schedule_service_1 = require("./Schedule.service");
// Create and Save new Schedule
const createSchedule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield Schedule_service_1.ScheduleService.createSchedule(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Schedule created successfully",
        data: result,
    });
}));
// Retrieve all Schedules from the database.
const getAllSchedules = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const payload = (0, pick_1.default)(req.query, Schedule_constants_1.ScheduleFilterAbleField);
    const result = yield Schedule_service_1.ScheduleService.getAllSchedules(options, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Schedule list fetched successfully",
        data: result,
    });
}));
// Find a single Schedule with an id
const getScheduleById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ScheduleId = req.params.id;
    const result = yield Schedule_service_1.ScheduleService.getScheduleById(ScheduleId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Schedule fetched successfully",
        data: result,
    });
}));
// Update a Schedule by id
const updateScheduleById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ScheduleId = req.params.id;
    const payload = req.body;
    const result = yield Schedule_service_1.ScheduleService.updateScheduleById(ScheduleId, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Schedule updated successfully",
        data: result,
    });
}));
// Delete a Schedule with the specified id 
const deleteScheduleById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ScheduleId = req.params.id;
    const result = yield Schedule_service_1.ScheduleService.deleteScheduleById(ScheduleId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Schedule deleted successfully",
        data: result,
    });
}));
exports.ScheduleController = {
    createSchedule,
    getAllSchedules,
    getScheduleById,
    updateScheduleById,
    deleteScheduleById,
};
//# sourceMappingURL=Schedule.controller.js.map