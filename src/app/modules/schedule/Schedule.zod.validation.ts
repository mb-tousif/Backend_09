import { z } from "zod";

const postValidation = z.object({
  body: z.object({
    bookingId: z.string({
      required_error: "Booking Id is required",
    }),
    serviceId: z.string({
      required_error: "Service Id is required",
    }),
    duration: z.string({
      required_error: "Duration is required",
    }),
    startDate: z.string({
      required_error: "Start Date is required",
    }),
    endDate: z.string({
      required_error: "End Date is required",
    }),
    status: z.enum(["Pending", "Confirmed", "Completed", "Rejected"], {
      required_error: "Status is required",
    }).optional(),
  }),
});

const updateValidation = z.object({
  body: z.object({
    bookingId: z.string().optional(),
    serviceId: z.string().optional(),
    duration: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z
      .enum(["Pending", "Confirmed", "Completed", "Rejected"], {
        required_error: "Status is required",
      })
      .optional(),
  }),
});

export const ScheduleValidation = {
  postValidation,
  updateValidation,
};
