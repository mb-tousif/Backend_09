import express from 'express';
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
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
