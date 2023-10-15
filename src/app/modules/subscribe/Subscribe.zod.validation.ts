
import { z } from "zod";

const postValidation = z.object({
    body: z.object({
        email: z.string().email(),
    })
});

const updateValidation = z.object({
    body: z.object({
        email: z.string().email().optional(),
    })
});

export const SubscribeValidation = {
    postValidation,
    updateValidation
}