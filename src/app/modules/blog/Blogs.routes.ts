

import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/common';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogsController } from './Blogs.controller';
import { BlogsValidation } from './Blogs.zod.validation';

const router = express.Router();

router.get(
    '/all-blogs',
    BlogsController.getAllBlogs
);

router.get(
    '/:id',
    BlogsController.getBlogsById
);

router.post(
    '/create-blogs',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(BlogsValidation.postValidation),
    BlogsController.createBlogs
);

router.patch(
  "/update-blogs/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(BlogsValidation.updateValidation),
  BlogsController.updateBlogsById
);

router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    BlogsController.deleteBlogsById
);

export const BlogsRoutes = router;

