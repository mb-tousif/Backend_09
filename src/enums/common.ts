/* eslint-disable no-unused-vars */
export enum ENUM_USER_ROLE {
  SUPER_ADMIN = 'Super Admin',
  ADMIN = 'Admin',
  USER = 'User',
}

export enum ENUM_Booking_Status {
  PENDING = "Pending",
  CONFIRMED = "Confirmed",
  DELIVERED = "Delivered",
  CANCELLED = "Cancelled",
}

export enum ENUM_Payment_Status {
  PENDING = "Pending",
  PARTIALLY_PAID = "Partially Paid",
  PAID = "Paid",
  CANCELLED = "Cancelled",
}

export enum ENUM_SERVICE_CATEGORY {
  FURNITURE_PAINTING = "Furniture painting",
  HOME_PAINTING = "Home painting",
  OFFICE_PAINTING = "Office painting",
  SHOP_PAINTING = "Shop painting",
}

enum ENUM_User_Status {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  BLOCKED = "Blocked",
}

export const furniturePaintName: string[] = [
  "Wooden Furniture Paint",
  "Metal Furniture Paint",
  "Plastic Furniture Paint",
  "Glass Furniture Paint",
];

export const homePaintName: string[] = [
 "Flat Interior Paintings",
  "Flat Exterior Paintings",
  "Flat Ceiling Paintings",
  "Flat Wall Paintings",
  "Flat Floor Paintings",
];

export const officePaintName: string[] = [
  "Interior Paintings",
  "Exterior Paintings",
  "Specific Area Paintings",
];

export const shopPaintName: string[] = [
  "Shop Renovation Paintings",
  "New Shop Paintings",
  "Shop Specific Area Paintings",
];