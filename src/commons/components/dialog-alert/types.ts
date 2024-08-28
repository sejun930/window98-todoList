import { IDialogAlertInfo } from "@/commons/zustand/types";
import { IWindowsHeaderProps } from "../windows/header/types";

export interface IDialogAlertProps {
  header: IWindowsHeaderProps;
  isOpen: boolean;
  alertInfo: IDialogAlertInfo;
}
