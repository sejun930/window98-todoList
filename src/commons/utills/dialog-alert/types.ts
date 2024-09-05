import type { IWindowsHeaderProps } from "@/commons/components/windows/header/types";
import type { IDialogAlertInfo } from "@/commons/zustand/types";

export interface IOpenDialogAlertProps {
  headerInfo: Pick<IWindowsHeaderProps, "title">;
  dialogAlertInfo: IDialogAlertInfo;
  onlyWait?: boolean;
}

export interface IUseUtillDialogAlertReturn {
  openDialogAlert: (props: IOpenDialogAlertProps) => void;
  closeDialogAlert: () => void;
}
