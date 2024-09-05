import type { IErrorType } from "@/commons/zustand/types";

export interface IUseUtillsErrorReturn {
  showError: (errorType: IErrorType) => void;
  hideError: () => void;
}
