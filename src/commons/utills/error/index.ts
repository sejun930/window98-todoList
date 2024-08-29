import { useErrorInfoState } from "@/commons/zustand/store";
import { IuseUtillsErrorReturn } from "./types";
import { IErrorType } from "@/commons/zustand/types";

// 에러 관련 공통 함수
export const useUtillsError = (): IuseUtillsErrorReturn => {
  const { setErrorInfo } = useErrorInfoState();

  // 에러 노출하기
  const showError = (errorType: IErrorType) => {
    setErrorInfo({
      isShow: true,
      errorType,
    });
  };

  // 에러 숨기기
  const hideError = () => {
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
