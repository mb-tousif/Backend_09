
import { z } from "zod";

const postValidation = z.object({
    body: z.object({
    bookingId: z.string({
        required_error: "bookingId is required",
    }).uuid(),
    serviceId: z.string({
        required_error: "serviceId is required",
    }).uuid(),
    amount: z.number({
        required_error: "amount is required",
    }).positive(),
    status: z.enum(["Pending", "Partially Paid", "Paid", "Refunded"],{
        required_error: "status is required",
    }),
    })
});

const updateValidation = z.object({
    body: z.object({
        status: z.enum(["Pending", "Partially Paid", "Paid", "Refunded"],{
            required_error: "status is required",
        }).optional(),
        amount: z.number({
            required_error: "amount is required",
        }).positive().optional(),
    })
});

export const PaymentValidation = {
    postValidation,
    updateValidation
}