"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../enums/common");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Schedule_controller_1 = require("./Schedule.controller");
const Schedule_zod_validation_1 = require("./Schedule.zod.validation");
const router = express_1.default.Router();
router.get('/all-schedules', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), Schedule_controller_1.ScheduleController.getAllSchedules);
router.get('/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), Schedule_controller_1.ScheduleController.getScheduleById);
router.post('/create-schedule', (0, auth_1.default)(common_1.ENUM_USER_ROLE.USER, common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(Schedule_zod_validation_1.ScheduleValidation.postValidation), Schedule_controller_1.ScheduleController.createSchedule);
router.patch("/update-schedule/:id", (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(Schedule_zod_validation_1.ScheduleValidation.updateValidation), Schedule_controller_1.ScheduleController.updateScheduleById);
router.delete('/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), Schedule_controller_1.ScheduleController.deleteScheduleById);
exports.ScheduleRoutes = router;
//# sourceMappingURL=Schedule.routes.js.map