import { z } from "zod";

const userUpdateValidationField = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    contact: z.string().optional(),
    address: z.string().optional(),
    imgUrl: z.string().optional(),
  }),
});

const adminUpdateValidationField = z.object({
  body: z.object({
    status: z
      .enum(["Active", "Inactive"], {
        required_error: "Status field data is not valid",
      })
  })
});

const superAdminUpdateValidationField = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    contact: z.string().optional(),
    role: z
      .enum(["User", "Admin", "Super_admin"], {
        required_error: "Role field is not valid",
      })
      .optional(),
    status: z
      .enum(["Active", "Inactive"], {
        required_error: "Status field data is not valid",
      })
      .optional(),
    address: z.string().optional(),
    imgUrl: z.string().optional(),
  }),
});

export const UserValidation = {
    userUpdateValidationField,
    adminUpdateValidationField,
    superAdminUpdateValidationField,
}