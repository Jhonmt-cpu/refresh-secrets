interface IDateProvider {
  addDays(days: number): Date;
  diffSeconds(date: Date): number;
}

export { IDateProvider };
