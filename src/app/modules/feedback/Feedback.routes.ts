

import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/common';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FeedbackController } from './Feedback.controller';
import { FeedbackValidation } from './Feedback.zod.validation';

const router = express.Router();

router.get(
    '/all-feedbacks',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    FeedbackController.getAllFeedbacks
);

router.get(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    FeedbackController.getFeedbackById
);

router.post(
    '/create-feedback',
    auth(ENUM_USER_ROLE.USER),
    validateRequest(FeedbackValidation.postValidation),
    FeedbackController.createFeedback
);

router.patch(
  "/update-feedback/:id",
  validateRequest(FeedbackValidation.updateValidation),
  FeedbackController.updateFeedbackById
);

router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    FeedbackController.deleteFeedbackById
);

export const FeedbackRoutes = router;

