"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../enums/common");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Notification_controller_1 = require("./Notification.controller");
const Notification_zod_validation_1 = require("./Notification.zod.validation");
const router = express_1.default.Router();
router.get('/all-notifications', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), Notification_controller_1.NotificationController.getAllNotifications);
router.get('/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), Notification_controller_1.NotificationController.getNotificationById);
router.post('/create-notification', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(Notification_zod_validation_1.NotificationValidation.postValidation), Notification_controller_1.NotificationController.createNotification);
router.patch("/update-notification/:id", (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(Notification_zod_validation_1.NotificationValidation.updateValidation), Notification_controller_1.NotificationController.updateNotificationById);
router.delete('/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN), Notification_controller_1.NotificationController.deleteNotificationById);
exports.NotificationRoutes = router;
//# sourceMappingURL=Notification.routes.js.map