import { z } from "zod";

const postValidation = z.object({
  body: z.object({
    userId: z.string().uuid(),
    serviceId: z.string().uuid(),
    status: z.enum(
      ["Pending", "Confirmed", "Rejected", "Completed"],
      {
        required_error: "Status is required",
      }
    ),
    paymentStatus: z.enum(["Pending", "Partially Paid", "Paid"], {
      required_error: "Payment Status is required",
    }),
  }),
});

const updateValidation = z.object({
  body: z.object({
    userId: z.string().uuid().optional(),
    serviceId: z.string().uuid().optional(),
    status: z
      .enum(
        ["Pending", "Confirmed", "Rejected", "Completed"], {
        required_error: "Status is required",
      })
      .optional(),
    paymentStatus: z
      .enum(["Pending", "Partially Paid", "Paid"], {
        required_error: "Payment Status is required",
      })
      .optional(),
  }),
});

export const BookingValidation = {
  postValidation,
  updateValidation,
};
