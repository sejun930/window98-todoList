import type { IDialogAlertInfo } from "@/commons/zustand/types";
import type { IWindowsHeaderProps } from "../windows/header/types";

export interface IDialogAlertProps {
  header: Pick<IWindowsHeaderProps, "title">;
  isOpen: boolean;
  alertInfo: IDialogAlertInfo;
  onlyWait?: boolean; // 대기용으로 사용 = 수동으로 종료 불가
}
