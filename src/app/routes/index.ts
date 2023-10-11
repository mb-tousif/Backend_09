import express from 'express';
import { AdminRoutes } from '../modules/admin/Admin.routes';
import { SuperAdminRoutes } from '../modules/superAdmin/SuperAdmin.routes';
import { UserRoutes } from '../modules/user/User.routes';

const router = express.Router();

const moduleRoutes = [
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
