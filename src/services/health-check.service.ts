import { LoggerService } from './logger.service';
import moment from 'moment';

const logger = LoggerService.getLogger();

export class HealthCheckService {

  public checkHealth = () => {
    logger.debug('HealthCheckService :: checkHealth :: Status of application retrivied');

    const uptimeHumanDate = this.getHumanDate();

    return {
      apiName: 'macher-challenge',
      uptime: uptimeHumanDate
    };
  };

  private getHumanDate = (): string => {
    const secondsToMilliseconds = (seconds: number) => seconds * 1000;
    const momentFormat = (seconds: number) => moment.utc(secondsToMilliseconds(seconds)).format('HH:mm');
    return momentFormat(process.uptime());
  };
}
