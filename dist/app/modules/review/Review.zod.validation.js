"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const postValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z
            .string({
            required_error: "User Id is required",
        })
            .uuid(),
        serviceId: zod_1.z
            .string({
            required_error: "Service Id is required",
        })
            .uuid(),
        rating: zod_1.z.string({
            required_error: "Rating is required",
        }),
        comment: zod_1.z.string({
            required_error: "Comment is required",
        }),
    }),
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().uuid().optional(),
        serviceId: zod_1.z.string().uuid().optional(),
        rating: zod_1.z.string().optional(),
        comment: zod_1.z.string().optional(),
    }),
});
exports.ReviewValidation = {
    postValidation,
    updateValidation,
};
//# sourceMappingURL=Review.zod.validation.js.map