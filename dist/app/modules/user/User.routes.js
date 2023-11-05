"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../enums/common");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const User_controller_1 = require("./User.controller");
const User_zod_validation_1 = require("./User.zod.validation");
const router = express_1.default.Router();
router.get('/all-users', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN), User_controller_1.UserController.getAllUsers);
router.get('/profile/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.USER, common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN), User_controller_1.UserController.getProfileById);
router.patch('/update-profile/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(User_zod_validation_1.UserValidation.userUpdateValidationField), User_controller_1.UserController.updateProfileById);
router.delete('/delete-user/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN), User_controller_1.UserController.deleteUserById);
exports.UserRoutes = router;
//# sourceMappingURL=User.routes.js.map