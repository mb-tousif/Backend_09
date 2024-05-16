"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFilterableFields = exports.userSearchableFields = exports.Enum_User_Status = void 0;
var Enum_User_Status;
(function (Enum_User_Status) {
    Enum_User_Status["ACTIVE"] = "Active";
    Enum_User_Status["INACTIVE"] = "Inactive";
})(Enum_User_Status || (exports.Enum_User_Status = Enum_User_Status = {}));
exports.userSearchableFields = ["name", "email", "role", "status", "address"];
exports.userFilterableFields = ["search", 'name', 'role', 'status'];
//# sourceMappingURL=User.constants.js.map