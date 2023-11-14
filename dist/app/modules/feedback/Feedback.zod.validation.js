"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackValidation = void 0;
const zod_1 = require("zod");
const postValidation = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z.string().min(3).max(300),
    })
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z.string().min(3).max(300).optional(),
        userId: zod_1.z.string().uuid().optional(),
    })
});
exports.FeedbackValidation = {
    postValidation,
    updateValidation
};
//# sourceMappingURL=Feedback.zod.validation.js.map