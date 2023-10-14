import { z } from "zod";

const postValidation = z.object({
  body: z.object({
    userId: z
      .string({
        required_error: "userId is required",
      })
      .uuid(),
    title: z
      .string({
        required_error: "title is required",
      })
      .min(3)
      .max(100),
    content: z
      .string({
        required_error: "content is required",
      })
      .min(3),
    imgUrl: z
      .string({
        required_error: "imgUrl is required",
      })
      .optional(),
  }),
});

const updateValidation = z.object({
  body: z.object({
    userId: z.string().uuid().optional(),
    title: z.string().min(3).max(100).optional(),
    content: z.string().min(3).optional(),
    imgUrl: z.string().optional(),
  }),
});

export const BlogsValidation = {
  postValidation,
  updateValidation,
};