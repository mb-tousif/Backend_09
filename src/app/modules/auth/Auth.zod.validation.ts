import { z } from "zod";

const signInValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(3)
      .max(255),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6)
      .max(255),
    gender: z.enum(["Male", "Female", "Other"], {
      required_error: "Gender is required",
    }),
    role: z
      .enum(["user", "admin", "super_admin"], {
        required_error: "Role is required",
      })
      .optional(),
    contact: z.string({
      required_error: "Contact No is required",
    }),
    address: z.string({
      required_error: "Address is required",
    }),
    imgUrl: z.string().optional(),
  }),
});

const loginValidation = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});

const resetPasswordValidation = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

export const AuthValidation = {
  signInValidation,
  loginValidation,
  refreshTokenZodSchema,
  resetPasswordValidation,
};
