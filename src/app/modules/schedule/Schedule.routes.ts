// import express from 'express';
// import { ENUM_USER_ROLE } from '../../../enums/common';
// import auth from '../../middlewares/auth';
// import validateRequest from '../../middlewares/validateRequest';
// import { ScheduleController } from './Schedule.controller';
// import { ScheduleValidation } from './Schedule.zod.validation';

// const router = express.Router();

// router.get(
//     '/all-schedules',
//     auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
//     ScheduleController.getAllSchedules
// );

// router.get(
//     '/:id',
//     auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
//     ScheduleController.getScheduleById
// );

// router.post(
//     '/create-schedule',
//     auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
//     validateRequest(ScheduleValidation.postValidation),
//     ScheduleController.createSchedule
// );

// router.patch(
//   "/update-schedule/:id",
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
//   validateRequest(ScheduleValidation.updateValidation),
//   ScheduleController.updateScheduleById
// );

// router.delete(
//     '/:id',
//     auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
//     ScheduleController.deleteScheduleById
// );

// export const ScheduleRoutes = router;

