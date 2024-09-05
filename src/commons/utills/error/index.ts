import { useErrorInfoState } from "@/commons/zustand/store";
import type { IUseUtillsErrorReturn } from "./types";
import type { IErrorType } from "@/commons/zustand/types";

// 에러 관련 공통 함수
export const useUtillsError = (): IUseUtillsErrorReturn => {
  const { setErrorInfo } = useErrorInfoState();

  // 에러 노출하기
  const showError = (errorType: IErrorType): void => {
    setErrorInfo({
      isShow: true,
      errorType,
    });
  };

  // 에러 숨기기
  const hideError = (): void => {
    setErrorInfo({
      isShow: false,
      errorType: "400",
    });
  };

  return {
    showError,
    hideError,
  };
};
