
import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/common';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PaintingController } from './Painting.controller';
import { PaintingValidation } from './Painting.zod.validation';

const router = express.Router();

router.get('/get-all-services',
    auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER ),
    PaintingController.getAllServices
);

router.post('/create-service',
    auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN ),
    validateRequest( PaintingValidation.postValidation ),
    PaintingController.createService
);

export const PaintingRoutes = router;
