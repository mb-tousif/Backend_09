
import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from '../auth/Auth.zod.validation';
import { SuperAdminController } from './SuperAdmin.controller';

const router = express.Router();

router.post('/createAdmin',
    auth( ENUM_USER_ROLE.SUPER_ADMIN ),
    validateRequest( AuthValidation.signInValidation ),
    SuperAdminController.createAdmin
);

export const SuperAdminRoutes = router;
