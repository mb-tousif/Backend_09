"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartFilterableFields = exports.cartSearchableFields = exports.CART_STATUS = void 0;
// Cart Status
exports.CART_STATUS = {
    PENDING: 'Pending',
    BOOKED: 'Booked',
    CANCELLED: 'Cancelled by user',
    FAILED: 'Cancelled by admin',
};
exports.cartSearchableFields = ["status", "userId", "serviceId"];
exports.cartFilterableFields = ["search", "status", "userId", "serviceId"];
//# sourceMappingURL=Cart.constants.js.map