import { Router } from 'express';
import { AuthController } from './auth.controller';
import { HealthCheckController } from './health-check.controller';
import { UserController } from './user.controller';

const router = Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: AuthController,
  },
  {
    path: '/health',
    route: HealthCheckController,
  },
  {
    path: '/user',
    route: UserController,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export const Routes: Router = router;
