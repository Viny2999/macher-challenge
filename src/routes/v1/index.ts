import { Router } from 'express';
import { AuthRoute } from './auth.route';
import { HealthCheckRoute } from './health-check.route';
import { UserRoute } from './user.route';

const router = Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/health',
    route: HealthCheckRoute,
  },
  {
    path: '/user',
    route: UserRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export const Routes: Router = router;
