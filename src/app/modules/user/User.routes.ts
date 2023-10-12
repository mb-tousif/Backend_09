import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './User.controller';
import { UserValidation } from './User.zod.validation';

const router = express.Router();

router.get('/all-users',
    auth( ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    UserController.getAllUsers
);

router.get('/profile/:id',
    auth( ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
    UserController.getProfileById
);

router.patch('/update-profile/:id',
    auth( ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest( UserValidation.userUpdateValidationField),
    UserController.updateProfileById
);

router.delete('/delete-user/:id',
    auth( ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    UserController.deleteUserById
);

export const UserRoutes = router;
