"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaintingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../enums/common");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Painting_controller_1 = require("./Painting.controller");
const Painting_zod_validation_1 = require("./Painting.zod.validation");
const router = express_1.default.Router();
// Get all services
router.get('/get-all-services', (0, auth_1.default)(common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.USER), Painting_controller_1.PaintingController.getAllServices);
// Get service by id
router.get('/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.USER), Painting_controller_1.PaintingController.getServiceById);
// Post service data to database
router.post('/create-service', (0, auth_1.default)(common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(Painting_zod_validation_1.PaintingValidation.postValidation), Painting_controller_1.PaintingController.createService);
// Update service by id
router.patch("/update-service/:id", (0, auth_1.default)(common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(Painting_zod_validation_1.PaintingValidation.updateValidation), Painting_controller_1.PaintingController.updateServiceById);
// Delete service by id
router.delete("/delete-service/:id", (0, auth_1.default)(common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.ADMIN), Painting_controller_1.PaintingController.deleteServiceById);
exports.PaintingRoutes = router;
//# sourceMappingURL=Painting.routes.js.map