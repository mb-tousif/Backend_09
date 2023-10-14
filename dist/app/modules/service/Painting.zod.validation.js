"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaintingValidation = void 0;
const zod_1 = require("zod");
const postValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(3).max(255),
        price: zod_1.z.number().min(0),
        category: zod_1.z.enum([
            "Furniture painting",
            "Home painting",
            "Office painting",
            "Shop painting",
        ], {
            required_error: "Category field is not valid",
        }),
        description: zod_1.z.string().min(3).max(300),
        schedule: zod_1.z.string().min(3).max(255),
        imgUrl: zod_1.z.string().optional(),
    }),
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(3).max(255).optional(),
        price: zod_1.z.number().min(0).optional(),
        category: zod_1.z
            .enum([
            "Furniture painting",
            "Home painting",
            "Office painting",
            "Shop painting",
        ], {
            required_error: "Category field is not valid",
        })
            .optional(),
        description: zod_1.z.string().min(3).max(255).optional(),
        schedule: zod_1.z.string().min(3).max(255).optional(),
        imgUrl: zod_1.z.string().optional(),
    }),
});
exports.PaintingValidation = {
    postValidation,
    updateValidation,
};
//# sourceMappingURL=Painting.zod.validation.js.map