# This project is for Painting Booking and Management Service

## Description
<p>This <em>Painting Booking and Management Service</em> is a backend boilerplate for Node.js, Express.js, and Prisma ORM. It is a comprehensive online platform backend project that allows users to book services and manage their bookings. It is built with Node.js, Express.js, and Prisma ORM. It also includes authentication, authorization, and role-based access control.</p>

### Features

[x] Implemented CRUD operations
[x] Implemented Authentication and Authorization
[x] Implemented Pagination and Filtering
[x] Implemented $transaction for logical groups of processing data in Mongodb that needs to encapsulate several operations.
[x] Implemented Zod for validation
[x] Implemented JWT for authentication
[x] Implemented Bcrypt for hashing password
[x] Implemented Prisma for ORM
[x] Implemented Typescript for type checking

### Technologies Used

[x] Express.js
[x] Typescript
[x] Prisma
[x] MongoDB
[x] Zod
[x] JWT
[x] Bcrypt

### Entity Relationship Diagram

<p>
<img src="./ERD.svg" align="center" width="100%" height="100%" style="border-radius: 30px;">
</p>

#### API Endpoints

#### User

[x] Create User POST /api/v1/auth/register [All users]
[x] Login User POST /api/v1/auth/login [All users]
[x] Get All Users GET /api/v1/users [All users]
[x] Get User by id GET /api/v1/users/:id [All users]
[x] Update User PATCH /api/v1/users/:id [Only admin]
[x] Delete User DELETE /api/v1/users/:id [Only admin]

Happy coding!