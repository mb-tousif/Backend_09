import { z } from "zod";

const postValidation = z.object({
    body: z.object({
        serviceId: z.string().uuid(),
        quantity: z.number().int().positive().optional(),
        totalPrice: z.number().int().positive(),
        status: z.enum(['Pending', 'Booked', 'Cancelled by user', 'Cancelled by admin'],{
            required_error: "Status field is invalid"
        }).optional()
    })
});

const updateValidation = z.object({
    body: z.object({
        userId: z.string().uuid().optional(),
        serviceId: z.string().uuid().optional(),
        quantity: z.number().int().positive().optional(),
        totalPrice: z.number().int().positive().optional(),
        status: z.enum(['Pending', 'Booked', 'Cancelled by user', 'Cancelled by admin'],{
            required_error: "Status field is invalid"
        }).optional()
    })
});

export const CartValidation = {
    postValidation,
    updateValidation
}