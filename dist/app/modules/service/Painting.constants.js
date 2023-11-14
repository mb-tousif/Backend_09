"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopPaintName = exports.officePaintName = exports.homePaintName = exports.furniturePaintName = exports.ENUM_SERVICE_CATEGORY = exports.serviceFilterableFieldsForPublicApi = exports.serviceFilterableFields = exports.serviceSearchableFieldsForPublicApi = exports.serviceSearchableFields = void 0;
exports.serviceSearchableFields = ["name", "category", "status"];
exports.serviceSearchableFieldsForPublicApi = ["name", "category"];
exports.serviceFilterableFields = [
    "search",
    "name",
    "category",
    "schedule",
    "minPrice",
    "maxPrice",
    "status",
];
exports.serviceFilterableFieldsForPublicApi = [
    "search",
    "name",
    "category",
    "schedule",
    "minPrice",
    "maxPrice",
];
var ENUM_SERVICE_CATEGORY;
(function (ENUM_SERVICE_CATEGORY) {
    ENUM_SERVICE_CATEGORY["FURNITURE_PAINTING"] = "Furniture painting";
    ENUM_SERVICE_CATEGORY["HOME_PAINTING"] = "Home painting";
    ENUM_SERVICE_CATEGORY["OFFICE_PAINTING"] = "Office painting";
    ENUM_SERVICE_CATEGORY["SHOP_PAINTING"] = "Shop painting";
})(ENUM_SERVICE_CATEGORY || (exports.ENUM_SERVICE_CATEGORY = ENUM_SERVICE_CATEGORY = {}));
exports.furniturePaintName = [
    "Wooden Furniture Paint",
    "Metal Furniture Paint",
    "Plastic Furniture Paint",
    "Glass Furniture Paint",
    "Furniture Renovation Paint",
];
exports.homePaintName = [
    "Flat Interior Paintings",
    "Flat Exterior Paintings",
    "Flat Ceiling Paintings",
    "Flat Wall Paintings",
    "Flat Floor Paintings",
    "Specific Area Paintings",
];
exports.officePaintName = [
    "Interior Paintings",
    "Exterior Paintings",
    "Specific Area Paintings",
    "Ceiling Paintings",
    "Wall Paintings",
];
exports.shopPaintName = [
    "Shop Renovation Paintings",
    "New Shop Paintings",
    "Shop Specific Area Paintings",
    "Shop Interior Paintings",
    "Shop Ceiling Paintings",
    "Shop Wall Paintings",
];
//# sourceMappingURL=Painting.constants.js.map