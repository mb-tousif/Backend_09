"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackValidation = void 0;
const zod_1 = require("zod");
const postValidation = zod_1.z.object({
    body: zod_1.z.object({})
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({})
});
exports.FeedbackValidation = {
    postValidation,
    updateValidation
};
//# sourceMappingURL=Feedback.zod.validation.js.map