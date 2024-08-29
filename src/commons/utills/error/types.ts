import { IErrorType } from "@/commons/zustand/types";

export interface IuseUtillsErrorReturn {
  showError: (errorType: IErrorType) => void;
  hideError: () => void;
}
