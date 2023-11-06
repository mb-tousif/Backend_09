"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENUM_BOOKING_STATUS = exports.BookingFilterAbleField = exports.BookingSearchAbleField = void 0;
exports.BookingSearchAbleField = ["userId", "serviceId", "status", "paymentStatus"];
exports.BookingFilterAbleField = ["search", "userId", "serviceId", "status", "paymentStatus"];
var ENUM_BOOKING_STATUS;
(function (ENUM_BOOKING_STATUS) {
    ENUM_BOOKING_STATUS["PENDING"] = "Pending";
    ENUM_BOOKING_STATUS["CONFIRMED"] = "Confirmed";
    ENUM_BOOKING_STATUS["REJECTED"] = "Rejected";
    ENUM_BOOKING_STATUS["COMPLETED"] = "Completed";
    ENUM_BOOKING_STATUS["CANCELLED"] = "Cancelled";
})(ENUM_BOOKING_STATUS || (exports.ENUM_BOOKING_STATUS = ENUM_BOOKING_STATUS = {}));
//# sourceMappingURL=Booking.constants.js.map