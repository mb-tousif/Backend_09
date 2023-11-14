import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/common';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { NotificationController } from './Notification.controller';
import { NotificationValidation } from './Notification.zod.validation';

const router = express.Router();

router.get(
    '/all-notifications',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    NotificationController.getAllNotifications
);

router.get(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    NotificationController.getNotificationById
);

router.get(
    '/user/:id',
    auth(ENUM_USER_ROLE.USER),
    NotificationController.getNotificationByUserId
);

router.post(
    '/create-notification',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(NotificationValidation.postValidation),
    NotificationController.createNotification
);

router.patch(
  "/update-notification/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(NotificationValidation.updateValidation),
  NotificationController.updateNotificationById
);

router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    NotificationController.deleteNotificationById
);

export const NotificationRoutes = router;

