import express from 'express';
import { AdminRoutes } from '../modules/admin/Admin.routes';
import { AuthRoutes } from '../modules/auth/Auth.routes';
import { BookingRoutes } from '../modules/booking/Booking.routes';
import { CartRoutes } from '../modules/cart/Cart.routes';
import { FeedbackRoutes } from '../modules/feedback/Feedback.routes';
import { ScheduleRoutes } from '../modules/schedule/Schedule.routes';
import { PaintingRoutes } from '../modules/service/Painting.routes';
import { SuperAdminRoutes } from '../modules/superAdmin/SuperAdmin.routes';
import { UserRoutes } from '../modules/user/User.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    routes: AuthRoutes
  },
  {
    path: "/users",
    routes: UserRoutes
  },
  {
    path: "/admins",
    routes: AdminRoutes
  },
  {
    path: "/super-admins",
    routes: SuperAdminRoutes
  },
  {
    path: "/services",
    routes: PaintingRoutes
  },
  {
    path: "/carts",
    routes: CartRoutes
  },
  {
    path: "/bookings",
    routes: BookingRoutes
  },
  {
    path: "/schedules",
    routes: ScheduleRoutes
  },
  {
    path: "/feedbacks",
    routes: FeedbackRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
