

import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/common';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PaymentController } from './Payment.controller';
import { PaymentValidation } from './Payment.zod.validation';

const router = express.Router();

router.get(
    '/all-Payments',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    PaymentController.getAllPayments
);

router.get(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    PaymentController.getPaymentById
);

router.post(
    '/create-Payment',
    auth(ENUM_USER_ROLE.USER),
    validateRequest(PaymentValidation.postValidation),
    PaymentController.createPayment
);

router.patch(
  "/update-Payment/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(PaymentValidation.updateValidation),
  PaymentController.updatePaymentById
);

router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    PaymentController.deletePaymentById
);

export const PaymentRoutes = router;

