"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../enums/common");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Auth_controller_1 = require("./Auth.controller");
const Auth_zod_validation_1 = require("./Auth.zod.validation");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(Auth_zod_validation_1.AuthValidation.signInValidation), Auth_controller_1.AuthController.signupUser);
router.post('/login', (0, validateRequest_1.default)(Auth_zod_validation_1.AuthValidation.loginValidation), Auth_controller_1.AuthController.loginUser);
router.post('/refresh-token', (0, auth_1.default)(common_1.ENUM_USER_ROLE.USER, common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(Auth_zod_validation_1.AuthValidation.refreshTokenZodSchema), Auth_controller_1.AuthController.refreshToken);
exports.AuthRoutes = router;
//# sourceMappingURL=Auth.routes.js.map