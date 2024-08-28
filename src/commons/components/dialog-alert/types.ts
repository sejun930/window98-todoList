import { IDialogAlertInfo } from "@/commons/zustand/types";
import { IWindowsHeaderProps } from "../windows/header/types";

export interface IDialogAlertProps {
  header: Pick<IWindowsHeaderProps, "title">;
  isOpen: boolean;
  alertInfo: IDialogAlertInfo;
}
