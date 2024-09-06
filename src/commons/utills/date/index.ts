import dayjs from "dayjs";
import "dayjs/locale/ko";

import type { IGetNowReturn, IUseUtillsDateReturn } from "./types";

dayjs.locale("ko"); // 한국 환경의 날짜 설정

// 날짜 관련 공통 함수
export const useUtillsDate = (): IUseUtillsDateReturn => {
  // 현재 시간 정보 조회
  const getNow = (): IGetNowReturn => {
    const now = dayjs(new Date());

    return {
      date: String(now.toDate()),
      dateTime: Number(now),
    };
  };

  return {
    getNow,
  };
};
