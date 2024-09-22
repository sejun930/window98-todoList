export interface IUseUtillsDateReturn {
  getNow: () => ITimeReturn;
  getTimeString: (dateTime: number) => string;
}

export interface ITimeReturn {
  date: string;
  dateTime: number;
}
