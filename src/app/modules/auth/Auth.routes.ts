import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/common';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './Auth.controller';
import { AuthValidation } from './Auth.zod.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.signInValidation),
  AuthController.signupUser
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidation),
  AuthController.loginUser
);

router.post(
  '/refresh-token',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
