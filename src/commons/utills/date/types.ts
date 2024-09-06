export interface IUseUtillsDateReturn {
  getNow: () => IGetNowReturn;
}

export interface IGetNowReturn {
  date: string;
  dateTime: number;
}
