import { z } from "zod";

const postValidation = z.object({
  body: z.object({
    serviceId: z.string().uuid(),
    status: z.enum(
      ["Pending", "Confirmed", "Rejected", "Completed"],
      {
        required_error: "Status is required",
      }
    ).optional(),
    paymentStatus: z.enum(["Pending", "Partially Paid", "Paid"], {
      required_error: "Payment Status is required",
    }).optional(),
  }),
});

const updateValidation = z.object({
  body: z.object({
    userId: z.string().uuid().optional(),
    serviceId: z.string().uuid().optional(),
    status: z
      .enum(["Pending", "Confirmed", "Rejected", "Completed", "Cancelled"], {
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

const changeBookingStatusByUser = z.object({
  body: z.object({
    status: z.enum(["Pending", "Confirmed", "Cancelled"], {
      required_error: "Status is required",
    }),
  }),
});

const changeBookingStatusByManagement = z.object({
  body: z.object({
    status: z.enum(["Rejected", "Delivered", "Completed"], {
      required_error: "Status is required",
    }),
  }),
});

export const BookingValidation = {
  postValidation,
  updateValidation,
  changeBookingStatusByUser,
  changeBookingStatusByManagement,
};
