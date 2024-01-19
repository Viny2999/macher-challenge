import { HealthCheckController } from '../../controllers/v1/health-check.controller';
import { Router } from 'express';

const router = Router();
const healthCheckController = new HealthCheckController();

router.get('/', healthCheckController.checkHealth);

export const HealthCheckRoute: Router = router;
