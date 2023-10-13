// Cart Status
export const CART_STATUS = {
    PENDING: 'Pending',
    BOOKED: 'Booked',
    CANCELLED: 'Cancelled by user',
    FAILED: 'Cancelled by admin',
};

export const cartSearchableFields: string[] = ["status", "userId", "serviceId"];

export const cartFilterableFields: string[] = [ "search", "status", "userId", "serviceId"];