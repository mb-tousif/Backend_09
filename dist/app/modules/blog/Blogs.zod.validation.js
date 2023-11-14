"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsValidation = void 0;
const zod_1 = require("zod");
const postValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: "title is required",
        })
            .min(3)
            .max(100),
        content: zod_1.z
            .string({
            required_error: "content is required",
        })
            .min(3),
        imgUrl: zod_1.z
            .string({
            required_error: "imgUrl is required",
        })
            .optional(),
    }),
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().uuid().optional(),
        title: zod_1.z.string().min(3).max(100).optional(),
        content: zod_1.z.string().min(3).optional(),
        imgUrl: zod_1.z.string().optional(),
    }),
});
exports.BlogsValidation = {
    postValidation,
    updateValidation,
};
//# sourceMappingURL=Blogs.zod.validation.js.map