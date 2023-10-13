
import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/common';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './Review.controller';
import { ReviewValidation } from './Review.zod.validation';

const router = express.Router();

router.get(
    '/all-Reviews',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    ReviewController.getAllReviews
);

router.get(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    ReviewController.getReviewById
);

router.post(
    '/create-Review',
    auth(ENUM_USER_ROLE.USER),
    validateRequest(ReviewValidation.postValidation),
    ReviewController.createReview
);

router.patch(
  "/update-Review/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(ReviewValidation.updateValidation),
  ReviewController.updateReviewById
);

router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    ReviewController.deleteReviewById
);

export const ReviewRoutes = router;

