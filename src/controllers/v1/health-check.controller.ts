import { Request, Response } from 'express';
import { HealthCheckService } from '../../services';

const healthCheckService = new HealthCheckService();

export class HealthCheckController {
  public checkHealth = (req: Request, res: Response): Response => {

    const healthBody = healthCheckService.checkHealth();

    return res.send(healthBody);
  };
}
