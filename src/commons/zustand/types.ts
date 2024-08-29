import type { StoreApi, UseBoundStore } from "zustand";
import { IWindowsHeaderProps } from "../components/windows/header/types";

export interface IDialogInfoProps {
  isOpenDialog: boolean;
  children: React.ReactNode;
  headerInfo: IWindowsHeaderProps;
}
// dialog 정보
// prettier-ignore
export type IUseDialogInfo = UseBoundStore<
  StoreApi<{
    dialogInfo: IDialogInfoProps;
    setDialogInfo: (props: IDialogInfoProps) => void;
  }>
>;

export interface IDialogAlertInfo {
  text: string | React.ReactNode | JSX.Element;
  okEvent?: () => void | Promise<void>;
}
export interface IDialogAlertInfoProps {
  isOpenDialogAlert: boolean;
  headerInfo: Pick<IWindowsHeaderProps, "title">;
  dialogAlertInfo: IDialogAlertInfo;
  onlyWait?: boolean;
}

// dialog-alert 정보
// prettier-ignore
export type IUseDialogAlertInfo = UseBoundStore<
  StoreApi<{
    dialogAlertInfo: IDialogAlertInfoProps;
    setDialogAlertInfo: (props: IDialogAlertInfoProps) => void;
  }>
>;

export type IErrorType = "404" | "400";

export interface IErrorInfoProps {
  isShow: boolean;
  errorType: IErrorType;
}
// Error 정보
// prettier-ignore
export type IUseErrorInfo = UseBoundStore<
  StoreApi<{
    errorInfo: IErrorInfoProps;
    setErrorInfo: (props: IErrorInfoProps) => void;
  }>
>;
