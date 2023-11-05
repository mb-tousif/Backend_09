"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentValidation = void 0;
const zod_1 = require("zod");
const postValidation = zod_1.z.object({
    body: zod_1.z.object({
        bookingId: zod_1.z.string({
            required_error: "bookingId is required",
        }).uuid(),
        serviceId: zod_1.z.string({
            required_error: "serviceId is required",
        }).uuid(),
        amount: zod_1.z.number({
            required_error: "amount is required",
        }).positive(),
        status: zod_1.z.enum(["Pending", "Partially Paid", "Paid", "Refunded"], {
            required_error: "status is required",
        }),
    })
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["Pending", "Partially Paid", "Paid", "Refunded"], {
            required_error: "status is required",
        }).optional(),
        amount: zod_1.z.number({
            required_error: "amount is required",
        }).positive().optional(),
    })
});
exports.PaymentValidation = {
    postValidation,
    updateValidation
};
//# sourceMappingURL=Payment.zod.validation.js.map