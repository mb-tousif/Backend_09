import { z } from "zod";

const postValidation = z.object({
  body: z.object({
    serviceId: z
      .string({
        required_error: "Service Id is required",
      })
      .uuid(),
    rating: z.string({
      required_error: "Rating is required",
    }),
    comment: z.string({
      required_error: "Comment is required",
    }),
  }),
});

const updateValidation = z.object({
  body: z.object({
    userId: z.string().uuid().optional(),
    serviceId: z.string().uuid().optional(),
    rating: z.string().optional(),
    comment: z.string().optional(),
  }),
});

export const ReviewValidation = {
  postValidation,
  updateValidation,
};