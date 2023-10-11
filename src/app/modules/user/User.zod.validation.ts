import { z } from "zod";

const updateValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    contact: z.string().optional(),
    role: z.enum(['User', 'Admin', 'Super_admin'], {
        required_error: 'Role field is not valid',
        }).optional(),
    address: z.string().optional(),
    imgUrl: z.string().optional(),
  }),
});

export const UserValidation = {
    updateValidation
}