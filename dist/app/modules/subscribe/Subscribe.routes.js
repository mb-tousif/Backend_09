"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../enums/common");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Subscribe_controller_1 = require("./Subscribe.controller");
const Subscribe_zod_validation_1 = require("./Subscribe.zod.validation");
const router = express_1.default.Router();
router.get('/all-subscribes', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN), Subscribe_controller_1.SubscribeController.getAllSubscribes);
router.post('/create-subscribe', (0, validateRequest_1.default)(Subscribe_zod_validation_1.SubscribeValidation.postValidation), Subscribe_controller_1.SubscribeController.createSubscribe);
router.delete('/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN), Subscribe_controller_1.SubscribeController.deleteSubscribeById);
exports.SubscribeRoutes = router;
//# sourceMappingURL=Subscribe.routes.js.map