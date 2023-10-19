
import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/common';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './Booking.controller';
import { BookingValidation } from './Booking.zod.validation';

const router = express.Router();

router.get(
    '/all-bookings',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    BookingController.getAllBookings
);

router.get(
    '/all-bookings-by-user',
    auth(ENUM_USER_ROLE.USER),
    BookingController.getAllBookingByUserId
);

router.get(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    BookingController.getBookingById
);

router.post(
    '/create-booking',
    auth(ENUM_USER_ROLE.USER),
    validateRequest(BookingValidation.postValidation),
    BookingController.createBooking
);

router.patch(
  "/update-booking-status-by-user/:id",
  auth(ENUM_USER_ROLE.USER),
  validateRequest(BookingValidation.changeBookingStatusByUser),
  BookingController.changeBookingStatusByUser
);

router.patch(
  "/update-booking-status-by-management/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(BookingValidation.changeBookingStatusByManagement),
  BookingController.changeBookingStatusByManagement
);

router.patch(
  "/update-booking/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(BookingValidation.updateValidation),
  BookingController.updateBookingById
);

router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    BookingController.deleteBookingById
);

export const BookingRoutes = router;
