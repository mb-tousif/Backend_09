import express from 'express';
import { AdminRoutes } from '../modules/admin/Admin.routes';
import { AuthRoutes } from '../modules/auth/Auth.routes';
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
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
