import type { StoreApi, UseBoundStore } from "zustand";
import type { IWindowsHeaderProps } from "../components/windows/header/types";

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

export interface IDesktopInfoProps {
  hasTodoList?: boolean; // 리스트 존재 여부
  hasRecycle?: boolean; // 삭제 리스트 존재 여부
}
// Desktop 정보
export type IUseDesktopInfo = UseBoundStore<
  StoreApi<{
    desktopInfo: IDesktopInfoProps;
    setDesktopInfo: (props: IDesktopInfoProps) => void;
  }>
>;

export type IDeletedInfos = Record<string, boolean>;
// 선택된 삭제 리스트 정보
export type IUseDeletedInfos = UseBoundStore<
  StoreApi<{
    deletedInfos: IDeletedInfos;
    setDeletedInfos: (props: IDeletedInfos) => void;
  }>
>;
