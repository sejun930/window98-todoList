export interface IWithZeroNumber {
  num: number;
  length?: number;
}

export interface IUseUtillsNumberReturn {
  withZeroNumber: (props: IWithZeroNumber) => string;
}
