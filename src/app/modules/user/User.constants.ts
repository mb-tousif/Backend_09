export enum Enum_User_Status {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive',
}

export const userSearchableFields: string[] = ["name", "email", "role", "status", "address"];

export const userFilterableFields: string[] = [ "search", 'name', 'role', 'status' ]; 