
import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/common';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/User.zod.validation';
import { AdminController } from './Admin.controller';

const router = express.Router();
router.patch(
  "/update-user/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.adminUpdateValidationField),
  AdminController.updateUserById
);

export const AdminRoutes = router;
