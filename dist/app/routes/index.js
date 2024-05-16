"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Admin_routes_1 = require("../modules/admin/Admin.routes");
const Auth_routes_1 = require("../modules/auth/Auth.routes");
const Blogs_routes_1 = require("../modules/blog/Blogs.routes");
const Booking_routes_1 = require("../modules/booking/Booking.routes");
const Cart_routes_1 = require("../modules/cart/Cart.routes");
const Feedback_routes_1 = require("../modules/feedback/Feedback.routes");
const Notification_routes_1 = require("../modules/notification/Notification.routes");
const Payment_routes_1 = require("../modules/payment/Payment.routes");
const Review_routes_1 = require("../modules/review/Review.routes");
const Painting_routes_1 = require("../modules/service/Painting.routes");
const Subscribe_routes_1 = require("../modules/subscribe/Subscribe.routes");
const SuperAdmin_routes_1 = require("../modules/superAdmin/SuperAdmin.routes");
const User_routes_1 = require("../modules/user/User.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        routes: Auth_routes_1.AuthRoutes,
    },
    {
        path: "/users",
        routes: User_routes_1.UserRoutes,
    },
    {
        path: "/admins",
        routes: Admin_routes_1.AdminRoutes,
    },
    {
        path: "/super-admins",
        routes: SuperAdmin_routes_1.SuperAdminRoutes,
    },
    {
        path: "/services",
        routes: Painting_routes_1.PaintingRoutes,
    },
    {
        path: "/carts",
        routes: Cart_routes_1.CartRoutes,
    },
    {
        path: "/bookings",
        routes: Booking_routes_1.BookingRoutes,
    },
    {
        path: "/payments",
        routes: Payment_routes_1.PaymentRoutes,
    },
    {
        path: "/reviews",
        routes: Review_routes_1.ReviewRoutes,
    },
    {
        path: "/feedbacks",
        routes: Feedback_routes_1.FeedbackRoutes,
    },
    {
        path: "/notifications",
        routes: Notification_routes_1.NotificationRoutes,
    },
    {
        path: "/blogs",
        routes: Blogs_routes_1.BlogsRoutes,
    },
    {
        path: "/subscribes",
        routes: Subscribe_routes_1.SubscribeRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
//# sourceMappingURL=index.js.map