import { HealthCheckService } from '../../services/health-check.service';

describe('HealthCheckService', () => {
  let healthCheckService: HealthCheckService;

  beforeEach(() => {
    healthCheckService = new HealthCheckService();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('checkHealth', () => {
    it('should return the correct health check object', () => {
      const expectedUptime = '00:00';

      const result = healthCheckService.checkHealth();

      expect(result).toEqual({
        apiName: 'macher-challenge',
        uptime: expectedUptime
      });
    });
  });

  describe('getHumanDate', () => {
    it('should return the human-readable uptime', () => {
      const expectedHumanDate = '00:00';

      const result = healthCheckService['getHumanDate']();

      expect(result).toBe(expectedHumanDate);
    });
  });
});