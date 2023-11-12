import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/common';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PaymentController } from './Payment.controller';
import { PaymentValidation } from './Payment.zod.validation';

const router = express.Router();

router.get(
    '/all-payments',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    PaymentController.getAllPayments
);

router.get(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    PaymentController.getPaymentById
);

router.post(
    '/create-payment',
    auth(ENUM_USER_ROLE.USER),
    validateRequest(PaymentValidation.postValidation),
    PaymentController.createPayment
);
router.post(
  "/validate_status",
  PaymentController.validatePaymentStatus
);

router.patch(
  "/update-payment/:id",
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

