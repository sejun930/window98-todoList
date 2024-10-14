import type { IUseUtillsNumberReturn, IWithZeroNumber } from "./types";

// 숫자 관련 함수
export const useUtillsNumber = (): IUseUtillsNumberReturn => {
  // 해당 숫자의 일정 자리까지 앞에 "0" 문자열 추가
  const withZeroNumber = ({ num, length }: IWithZeroNumber): string => {
    // 음수의 경우는 처리하지 않음
    if (num < 0) return String(num);

    return String(num).padStart(length ?? 2, "0");
  };

  return {
    withZeroNumber,
  };
};
