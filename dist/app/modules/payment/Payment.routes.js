"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../enums/common");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Payment_controller_1 = require("./Payment.controller");
const Payment_zod_validation_1 = require("./Payment.zod.validation");
const router = express_1.default.Router();
router.get('/all-payments', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), Payment_controller_1.PaymentController.getAllPayments);
router.get('/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), Payment_controller_1.PaymentController.getPaymentById);
router.post('/create-payment', (0, auth_1.default)(common_1.ENUM_USER_ROLE.USER), 
// validateRequest(PaymentValidation.postValidation),
Payment_controller_1.PaymentController.createPayment);
router.post("/validate_status", Payment_controller_1.PaymentController.validatePaymentStatus);
router.patch("/update-payment/:id", (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(Payment_zod_validation_1.PaymentValidation.updateValidation), Payment_controller_1.PaymentController.updatePaymentById);
router.delete('/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), Payment_controller_1.PaymentController.deletePaymentById);
exports.PaymentRoutes = router;
//# sourceMappingURL=Payment.routes.js.map