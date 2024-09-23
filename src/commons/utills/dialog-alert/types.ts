import type { IWindowsHeaderProps } from "@/commons/components/windows/header/types";
import type { IDialogAlertInfo } from "@/commons/zustand/types";

export interface IOpenDialogAlertProps {
  headerInfo: Pick<IWindowsHeaderProps, "title">;
  dialogAlertInfo: IDialogAlertInfo;
  onlyWait?: boolean;
}

export interface IOpenConfirmDialogAlertProps {
  headerInfo: IOpenDialogAlertProps["headerInfo"];
  dialogAlertInfo: Pick<IDialogAlertInfo, "text" | "cancelText">;
}

export interface IUseUtillsDialogAlertReturn {
  openDialogAlert: (props: IOpenDialogAlertProps) => void;
  closeDialogAlert: () => void;
  openConfirmDialogAlert: (props: IOpenConfirmDialogAlertProps) => void;
}
