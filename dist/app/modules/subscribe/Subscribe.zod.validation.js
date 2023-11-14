"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeValidation = void 0;
const zod_1 = require("zod");
const postValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
    })
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email().optional(),
    })
});
exports.SubscribeValidation = {
    postValidation,
    updateValidation
};
//# sourceMappingURL=Subscribe.zod.validation.js.map