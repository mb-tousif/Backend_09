
import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/common';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from '../auth/Auth.zod.validation';
import { UserValidation } from '../user/User.zod.validation';
import { SuperAdminController } from './SuperAdmin.controller';

const router = express.Router();

router.post('/createAdmin',
    auth( ENUM_USER_ROLE.SUPER_ADMIN ),
    validateRequest( AuthValidation.signInValidation ),
    SuperAdminController.createAdmin
);

router.patch('/update-user/:id',
    auth( ENUM_USER_ROLE.SUPER_ADMIN ),
    validateRequest( UserValidation.superAdminUpdateValidationField ),
    SuperAdminController.updateUserById
);

export const SuperAdminRoutes = router;
