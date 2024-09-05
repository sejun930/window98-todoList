import { useDialogAlertInfoState } from "@/commons/zustand/store";
import type {
  IUseUtillDialogAlertReturn,
  IOpenDialogAlertProps,
} from "./types";

// Dialog-alert 관련 공통 함수 모음
export const useUtillDialogAlert = (): IUseUtillDialogAlertReturn => {
  const { setDialogAlertInfo } = useDialogAlertInfoState();
  // Dialog-alert 실행
  const openDialogAlert = ({
    headerInfo,
    dialogAlertInfo,
    onlyWait = false,
  }: IOpenDialogAlertProps): void => {
    if (!dialogAlertInfo) return;

    setDialogAlertInfo({
      isOpenDialogAlert: true,
      headerInfo,
      dialogAlertInfo,
      onlyWait,
    });
  };

  // Dialog-alert 종료
  const closeDialogAlert = (): void => {
    setDialogAlertInfo({
      isOpenDialogAlert: false,
      headerInfo: { title: "" },
      dialogAlertInfo: { text: "", okEvent: () => {} },
      onlyWait: false,
    });
  };

  return {
    openDialogAlert,
    closeDialogAlert,
  };
};
