"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationValidation = void 0;
const zod_1 = require("zod");
const postValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z
            .string({
            required_error: "userId is required",
        })
            .uuid(),
        bookingId: zod_1.z
            .string({
            required_error: "bookingId is required",
        })
            .uuid(),
        paymentId: zod_1.z
            .string({
            required_error: "paymentId is required",
        })
            .uuid(),
        message: zod_1.z
            .string({
            required_error: "message is required",
        })
            .min(3)
            .max(300),
    }),
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().uuid().optional(),
        bookingId: zod_1.z.string().uuid().optional(),
        paymentId: zod_1.z.string().uuid().optional(),
        message: zod_1.z.string().min(3).max(300).optional(),
    }),
});
exports.NotificationValidation = {
    postValidation,
    updateValidation,
};
//# sourceMappingURL=Notification.zod.validation.js.map