"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userUpdateValidationField = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        contact: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        imgUrl: zod_1.z.string().optional(),
        gender: zod_1.z.enum(["Male", "Female", "Other"], {
            required_error: "Gender is required",
        }).optional(),
    }),
});
const adminUpdateValidationField = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z
            .enum(["Active", "Inactive", "Blocked"], {
            required_error: "Status field data is not valid",
        })
    })
});
const superAdminUpdateValidationField = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        contact: zod_1.z.string().optional(),
        role: zod_1.z
            .enum(["user", "admin", "Super_admin"], {
            required_error: "Role field is not valid",
        })
            .optional(),
        status: zod_1.z
            .enum(["Active", "Inactive"], {
            required_error: "Status field data is not valid",
        })
            .optional(),
        address: zod_1.z.string().optional(),
        imgUrl: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    userUpdateValidationField,
    adminUpdateValidationField,
    superAdminUpdateValidationField,
};
//# sourceMappingURL=User.zod.validation.js.map