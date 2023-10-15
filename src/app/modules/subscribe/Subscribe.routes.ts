import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/common';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SubscribeController } from './Subscribe.controller';
import { SubscribeValidation } from './Subscribe.zod.validation';

const router = express.Router();

router.get(
    '/all-subscribes',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    SubscribeController.getAllSubscribes
);

router.post(
    '/create-subscribe',
    validateRequest(SubscribeValidation.postValidation),
    SubscribeController.createSubscribe
);

router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    SubscribeController.deleteSubscribeById
);

export const SubscribeRoutes = router;

