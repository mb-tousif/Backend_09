"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENUM_PAYMENT_STATUS = exports.ENUM_Booking_Status = exports.ENUM_USER_ROLE = void 0;
/* eslint-disable no-unused-vars */
var ENUM_USER_ROLE;
(function (ENUM_USER_ROLE) {
    ENUM_USER_ROLE["SUPER_ADMIN"] = "super_admin";
    ENUM_USER_ROLE["ADMIN"] = "admin";
    ENUM_USER_ROLE["USER"] = "user";
})(ENUM_USER_ROLE || (exports.ENUM_USER_ROLE = ENUM_USER_ROLE = {}));
var ENUM_Booking_Status;
(function (ENUM_Booking_Status) {
    ENUM_Booking_Status["PENDING"] = "Pending";
    ENUM_Booking_Status["CONFIRMED"] = "Confirmed";
    ENUM_Booking_Status["DELIVERED"] = "Delivered";
})(ENUM_Booking_Status || (exports.ENUM_Booking_Status = ENUM_Booking_Status = {}));
var ENUM_PAYMENT_STATUS;
(function (ENUM_PAYMENT_STATUS) {
    ENUM_PAYMENT_STATUS["PENDING"] = "Pending";
    ENUM_PAYMENT_STATUS["PARTIALLY_PAID"] = "Partially Paid";
    ENUM_PAYMENT_STATUS["PAID"] = "Paid";
    ENUM_PAYMENT_STATUS["REFUNDED"] = "Refunded";
})(ENUM_PAYMENT_STATUS || (exports.ENUM_PAYMENT_STATUS = ENUM_PAYMENT_STATUS = {}));
var ENUM_User_Status;
(function (ENUM_User_Status) {
    ENUM_User_Status["ACTIVE"] = "Active";
    ENUM_User_Status["INACTIVE"] = "Inactive";
    ENUM_User_Status["BLOCKED"] = "Blocked";
})(ENUM_User_Status || (ENUM_User_Status = {}));
//# sourceMappingURL=common.js.map