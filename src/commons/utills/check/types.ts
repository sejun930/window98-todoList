export interface IGetIsDifferenceDatasProps {
  targetIds: string[]; // 비교할 대상의 id 값
  origin: Record<string, string>; // 원본 값
}

export interface IUseUtillsCheckReturn {
  getIsDifferenceDatas: (props: IGetIsDifferenceDatasProps) => boolean;
}
