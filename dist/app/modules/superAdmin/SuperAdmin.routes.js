"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../enums/common");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Auth_zod_validation_1 = require("../auth/Auth.zod.validation");
const User_zod_validation_1 = require("../user/User.zod.validation");
const SuperAdmin_controller_1 = require("./SuperAdmin.controller");
const router = express_1.default.Router();
router.post('/create-admin', (0, auth_1.default)(common_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(Auth_zod_validation_1.AuthValidation.signInValidation), SuperAdmin_controller_1.SuperAdminController.createAdmin);
router.patch('/update-user/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(User_zod_validation_1.UserValidation.superAdminUpdateValidationField), SuperAdmin_controller_1.SuperAdminController.updateUserById);
exports.SuperAdminRoutes = router;
//# sourceMappingURL=SuperAdmin.routes.js.map