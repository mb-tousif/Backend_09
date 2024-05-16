"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../enums/common");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Booking_controller_1 = require("./Booking.controller");
const Booking_zod_validation_1 = require("./Booking.zod.validation");
const router = express_1.default.Router();
router.get('/all-bookings', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), Booking_controller_1.BookingController.getAllBookings);
router.get('/all-bookings-by-user', (0, auth_1.default)(common_1.ENUM_USER_ROLE.USER), Booking_controller_1.BookingController.getAllBookingByUserId);
router.get('/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), Booking_controller_1.BookingController.getBookingById);
router.post('/create-booking', (0, auth_1.default)(common_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(Booking_zod_validation_1.BookingValidation.postValidation), Booking_controller_1.BookingController.createBooking);
router.patch("/update-booking-status-by-user/:id", (0, auth_1.default)(common_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(Booking_zod_validation_1.BookingValidation.changeBookingStatusByUser), Booking_controller_1.BookingController.changeBookingStatusByUser);
router.patch("/update-booking-status-by-management/:id", (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(Booking_zod_validation_1.BookingValidation.changeBookingStatusByManagement), Booking_controller_1.BookingController.changeBookingStatusByManagement);
router.patch("/update-booking/:id", (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(Booking_zod_validation_1.BookingValidation.updateValidation), Booking_controller_1.BookingController.updateBookingById);
router.delete('/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), Booking_controller_1.BookingController.deleteBookingById);
exports.BookingRoutes = router;
//# sourceMappingURL=Booking.routes.js.map