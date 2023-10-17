import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/common';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CartController } from './Cart.controller';
import { CartValidation } from './Cart.zod.validation';

const router = express.Router();

// Get all Carts
router.get(
    '/all-carts',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    CartController.getAllCarts
);

router.get(
    '/user-carts',
    auth(ENUM_USER_ROLE.USER),
    CartController.getCartsByUserId
);
// Get Cart by id
router.get(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    CartController.getCartById
);

// Get Carts by user id

// Post Cart data to database
router.post(
    '/create-cart',
    auth(ENUM_USER_ROLE.USER),
    validateRequest(CartValidation.postValidation),
    CartController.createCart
);

// Update Cart by id
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(CartValidation.updateValidation),
  CartController.updateCartById
);

// Delete Cart by id
router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    CartController.deleteCartById
);

export const CartRoutes = router;