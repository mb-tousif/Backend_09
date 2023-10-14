"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../enums/common");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const User_zod_validation_1 = require("../user/User.zod.validation");
const Admin_controller_1 = require("./Admin.controller");
const router = express_1.default.Router();
router.patch("/update-user/:id", (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(User_zod_validation_1.UserValidation.adminUpdateValidationField), Admin_controller_1.AdminController.updateUserById);
exports.AdminRoutes = router;
//# sourceMappingURL=Admin.routes.js.map