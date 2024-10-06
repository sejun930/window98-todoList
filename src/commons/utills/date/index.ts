import dayjs from "dayjs";
import "dayjs/locale/ko";

import type { ITimeReturn, IUseUtillsDateReturn } from "./types";

dayjs.locale("ko"); // 한국 환경의 날짜 설정

// 날짜 관련 공통 함수
export const useUtillsDate = (): IUseUtillsDateReturn => {
  // 현재 시간 정보 조회
  const getNow = (): ITimeReturn => {
    const now = dayjs(new Date());

    return {
      date: String(now.toDate()),
      dateTime: Number(now),
    };
  };

  // 해당 시간으로부터 현재 시간과 계산된 시간 문자열 노출
  const getTimeString = (dateTime: number): string => {
    // 현재 시간
    const nowTime = dayjs(getNow().dateTime);

    const seconds = dayjs(nowTime).diff(dateTime, "second"); // 초 단위
    const minutes = dayjs(nowTime).diff(dateTime, "minute"); // 분 단위
    const hours = dayjs(nowTime).diff(dateTime, "hour"); // 시간 단위

    if (seconds < 60)
      // 60초 미만일 경우
      return "Now";
    else if (minutes < 60)
      // 60분 미만일 경우
      return `${minutes} Minutes ago`;
    else if (hours < 24)
      // 24시간 미만일 경우
      return `${hours} Hours ago`;
    // 24시간 이상일 경우 = 년.월.일 형태로 노출
    else return `${dayjs(dateTime).format("YYYY.MM.DD")}`;
  };

  return {
    getNow,
    getTimeString,
  };
};
