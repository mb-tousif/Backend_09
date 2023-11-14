"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../enums/common");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Review_controller_1 = require("./Review.controller");
const Review_zod_validation_1 = require("./Review.zod.validation");
const router = express_1.default.Router();
router.get('/all-reviews', Review_controller_1.ReviewController.getAllReviews);
router.get('/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), Review_controller_1.ReviewController.getReviewById);
router.post('/create-review', (0, auth_1.default)(common_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(Review_zod_validation_1.ReviewValidation.postValidation), Review_controller_1.ReviewController.createReview);
router.patch("/update-review/:id", (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(Review_zod_validation_1.ReviewValidation.updateValidation), Review_controller_1.ReviewController.updateReviewById);
router.delete('/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), Review_controller_1.ReviewController.deleteReviewById);
exports.ReviewRoutes = router;
//# sourceMappingURL=Review.routes.js.map