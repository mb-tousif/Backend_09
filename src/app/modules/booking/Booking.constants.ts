
export const BookingSearchAbleField: string[] = [ "userId", "serviceId", "status"];

export const BookingFilterAbleField: string[] = [ "search", "userId", "serviceId", "status", "paymentStatus" ];

export enum ENUM_BOOKING_STATUS {
  PENDING = "Pending",
  CONFIRMED = "Confirmed",
  REJECTED = "Rejected",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}