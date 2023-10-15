
import { z } from "zod";

const postValidation = z.object({
    body: z.object({
        comment: z.string().min(3).max(300),
    })
});

const updateValidation = z.object({
    body: z.object({
        comment: z.string().min(3).max(300).optional(),
        userId: z.string().uuid().optional(),
    })
});

export const FeedbackValidation = {
    postValidation,
    updateValidation
}