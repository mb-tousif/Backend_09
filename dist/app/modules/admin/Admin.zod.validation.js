"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const postValidation = zod_1.z.object({
    body: zod_1.z.object({})
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({})
});
exports.AdminValidation = {
    postValidation,
    updateValidation
};
//# sourceMappingURL=Admin.zod.validation.js.map