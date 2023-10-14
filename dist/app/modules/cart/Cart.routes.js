"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../enums/common");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Cart_controller_1 = require("./Cart.controller");
const Cart_zod_validation_1 = require("./Cart.zod.validation");
const router = express_1.default.Router();
// Get all Carts
router.get('/all-carts', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN), Cart_controller_1.CartController.getAllCarts);
// Get Cart by id
router.get('/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), Cart_controller_1.CartController.getCartById);
// Post Cart data to database
router.post('/create-cart', (0, auth_1.default)(common_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(Cart_zod_validation_1.CartValidation.postValidation), Cart_controller_1.CartController.createCart);
// Update Cart by id
router.patch("/:id", (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(Cart_zod_validation_1.CartValidation.updateValidation), Cart_controller_1.CartController.updateCartById);
// Delete Cart by id
router.delete('/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), Cart_controller_1.CartController.deleteCartById);
exports.CartRoutes = router;
//# sourceMappingURL=Cart.routes.js.map