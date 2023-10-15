export const serviceSearchableFields: string[] = ["name", "category", "status"];
export const serviceSearchableFieldsForPublicApi: string[] = ["name", "category"];

export const serviceFilterableFields: string[] = [
  "search",
  "name",
  "category",
  "price",
  "schedule",
  "minPrice",
  "maxPrice",
  "status",
];

export const serviceFilterableFieldsForPublicApi: string[] = [
  "search",
  "name",
  "category",
  "price",
  "schedule",
  "minPrice",
  "maxPrice",
];

export enum ENUM_SERVICE_CATEGORY {
  FURNITURE_PAINTING = "Furniture painting",
  HOME_PAINTING = "Home painting",
  OFFICE_PAINTING = "Office painting",
  SHOP_PAINTING = "Shop painting",
}

export const furniturePaintName: string[] = [
  "Wooden Furniture Paint",
  "Metal Furniture Paint",
  "Plastic Furniture Paint",
  "Glass Furniture Paint",
  "Furniture Renovation Paint",
];

export const homePaintName: string[] = [
  "Flat Interior Paintings",
  "Flat Exterior Paintings",
  "Flat Ceiling Paintings",
  "Flat Wall Paintings",
  "Flat Floor Paintings",
  "Specific Area Paintings",
];

export const officePaintName: string[] = [
  "Interior Paintings",
  "Exterior Paintings",
  "Specific Area Paintings",
  "Ceiling Paintings",
  "Wall Paintings",
];

export const shopPaintName: string[] = [
  "Shop Renovation Paintings",
  "New Shop Paintings",
  "Shop Specific Area Paintings",
  "Shop Interior Paintings",
  "Shop Ceiling Paintings",
  "Shop Wall Paintings",
];