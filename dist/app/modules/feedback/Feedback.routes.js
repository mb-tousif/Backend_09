"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackRoutes = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../enums/common");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Feedback_controller_1 = require("./Feedback.controller");
const Feedback_zod_validation_1 = require("./Feedback.zod.validation");
const router = express_1.default.Router();
router.get('/all-feedbacks', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), Feedback_controller_1.FeedbackController.getAllFeedbacks);
router.get('/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), Feedback_controller_1.FeedbackController.getFeedbackById);
router.post('/create-feedback', (0, auth_1.default)(common_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(Feedback_zod_validation_1.FeedbackValidation.postValidation), Feedback_controller_1.FeedbackController.createFeedback);
router.patch("/update-feedback/:id", (0, validateRequest_1.default)(Feedback_zod_validation_1.FeedbackValidation.updateValidation), Feedback_controller_1.FeedbackController.updateFeedbackById);
router.delete('/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), Feedback_controller_1.FeedbackController.deleteFeedbackById);
exports.FeedbackRoutes = router;
//# sourceMappingURL=Feedback.routes.js.map