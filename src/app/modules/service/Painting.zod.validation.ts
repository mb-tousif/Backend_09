import { z } from "zod";

const postValidation = z.object({
  body: z.object({
    name: z.string().min(3).max(255),
    price: z.number().min(0),
    category: z.enum(
      [
        "Furniture painting",
        "Home painting",
        "Office painting",
        "Shop painting",
      ],
      {
        required_error: "Category field is not valid",
      }
    ),
    description: z.string().min(3).max(300),
    schedule: z.string().min(3).max(255),
    imgUrl: z.string().optional(),
  }),
});

const updateValidation = z.object({
  body: z.object({
    name: z.string().min(3).max(255).optional(),
    price: z.number().min(0).optional(),
    category: z
      .enum(
        [
          "Furniture painting",
          "Home painting",
          "Office painting",
          "Shop painting",
        ],
        {
          required_error: "Category field is not valid",
        }
      )
      .optional(),
    description: z.string().min(3).max(255).optional(),
    schedule: z.string().min(3).max(255).optional(),
    imgUrl: z.string().optional(),
  }),
});

export const PaintingValidation = {
  postValidation,
  updateValidation,
};
