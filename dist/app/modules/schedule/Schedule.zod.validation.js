"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleValidation = void 0;
const zod_1 = require("zod");
const postValidation = zod_1.z.object({
    body: zod_1.z.object({
        bookingId: zod_1.z.string({
            required_error: "Booking Id is required",
        }),
        serviceId: zod_1.z.string({
            required_error: "Service Id is required",
        }),
        duration: zod_1.z.string({
            required_error: "Duration is required",
        }),
        startDate: zod_1.z.string({
            required_error: "Start Date is required",
        }),
        endDate: zod_1.z.string({
            required_error: "End Date is required",
        }),
        status: zod_1.z.enum(["Pending", "Confirmed", "Completed", "Rejected"], {
            required_error: "Status is required",
        }).optional(),
    }),
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({
        bookingId: zod_1.z.string().optional(),
        serviceId: zod_1.z.string().optional(),
        duration: zod_1.z.string().optional(),
        startDate: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
        status: zod_1.z
            .enum(["Pending", "Confirmed", "Completed", "Rejected"], {
            required_error: "Status is required",
        })
            .optional(),
    }),
});
exports.ScheduleValidation = {
    postValidation,
    updateValidation,
};
//# sourceMappingURL=Schedule.zod.validation.js.map