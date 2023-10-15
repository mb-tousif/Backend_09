import { z } from "zod";

const postValidation = z.object({
  body: z.object({
    bookingId: z
      .string({
        required_error: "bookingId is required",
      })
      .uuid(),
    paymentId: z
      .string({
        required_error: "paymentId is required",
      })
      .uuid(),
    message: z
      .string({
        required_error: "message is required",
      })
      .min(3)
      .max(300),
  }),
});

const updateValidation = z.object({
  body: z.object({
    userId: z.string().uuid().optional(),
    bookingId: z.string().uuid().optional(),
    paymentId: z.string().uuid().optional(),
    message: z.string().min(3).max(300).optional(),
  }),
});

export const NotificationValidation = {
  postValidation,
  updateValidation,
};
