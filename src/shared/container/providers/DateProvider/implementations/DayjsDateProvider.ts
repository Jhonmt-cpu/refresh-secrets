import dayjs from 'dayjs';
import { IDateProvider } from '../IDateProvider';

class DayJsDateProvider implements IDateProvider {
  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  diffSeconds(date: Date): number {
    return dayjs(date).diff(dayjs(), 'second');
  }
}

export { DayJsDateProvider };
