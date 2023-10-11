
import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './User.controller';

const router = express.Router();

router.get('/profile/:id',
    auth( ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
    UserController.getProfileById
);

export const UserRoutes = router;
