"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../enums/common");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Blogs_controller_1 = require("./Blogs.controller");
const Blogs_zod_validation_1 = require("./Blogs.zod.validation");
const router = express_1.default.Router();
router.get('/all-blogs', Blogs_controller_1.BlogsController.getAllBlogs);
router.get('/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN, common_1.ENUM_USER_ROLE.USER), Blogs_controller_1.BlogsController.getBlogsById);
router.post('/create-blogs', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(Blogs_zod_validation_1.BlogsValidation.postValidation), Blogs_controller_1.BlogsController.createBlogs);
router.patch("/update-blogs/:id", (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(Blogs_zod_validation_1.BlogsValidation.updateValidation), Blogs_controller_1.BlogsController.updateBlogsById);
router.delete('/:id', (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN, common_1.ENUM_USER_ROLE.SUPER_ADMIN), Blogs_controller_1.BlogsController.deleteBlogsById);
exports.BlogsRoutes = router;
//# sourceMappingURL=Blogs.routes.js.map