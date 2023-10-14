"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENUM_SCHEDULE_STATUS = exports.ScheduleFilterAbleField = exports.ScheduleSearchAbleField = void 0;
exports.ScheduleSearchAbleField = ["bookingId", "serviceId", "duration", "startDate", "endDate", "status"];
exports.ScheduleFilterAbleField = ["search", "bookingId", "serviceId", "duration", "startDate", "endDate", "status"];
var ENUM_SCHEDULE_STATUS;
(function (ENUM_SCHEDULE_STATUS) {
    ENUM_SCHEDULE_STATUS["PENDING"] = "Pending";
    ENUM_SCHEDULE_STATUS["CONFIRMED"] = "Confirmed";
    ENUM_SCHEDULE_STATUS["COMPLETED"] = "Completed";
    ENUM_SCHEDULE_STATUS["REJECTED"] = "Rejected";
})(ENUM_SCHEDULE_STATUS || (exports.ENUM_SCHEDULE_STATUS = ENUM_SCHEDULE_STATUS = {}));
//# sourceMappingURL=Schedule.constants.js.map