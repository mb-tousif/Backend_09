"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartValidation = void 0;
const zod_1 = require("zod");
const postValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().uuid(),
        serviceId: zod_1.z.string().uuid(),
        quantity: zod_1.z.number().int().positive().optional(),
        totalPrice: zod_1.z.number().int().positive(),
        status: zod_1.z.enum(['Pending', 'Booked', 'Cancelled by user', 'Cancelled by admin'], {
            required_error: "Status field is invalid"
        }).optional()
    })
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().uuid().optional(),
        serviceId: zod_1.z.string().uuid().optional(),
        quantity: zod_1.z.number().int().positive().optional(),
        totalPrice: zod_1.z.number().int().positive().optional(),
        status: zod_1.z.enum(['Pending', 'Booked', 'Cancelled by user', 'Cancelled by admin'], {
            required_error: "Status field is invalid"
        }).optional()
    })
});
exports.CartValidation = {
    postValidation,
    updateValidation
};
//# sourceMappingURL=Cart.zod.validation.js.map