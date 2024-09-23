import { useDialogAlertInfoState } from "@/commons/zustand/store";
import type {
  IUseUtillsDialogAlertReturn,
  IOpenDialogAlertProps,
  IOpenConfirmDialogAlertProps,
} from "./types";

// Dialog-alert 관련 공통 함수 모음
export const useUtillsDialogAlert = (): IUseUtillsDialogAlertReturn => {
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
      dialogAlertInfo: { text: "" },
      onlyWait: false,
    });
  };

  // 확인용 Dialog-alert 실행
  const openConfirmDialogAlert = ({
    dialogAlertInfo,
    headerInfo,
  }: IOpenConfirmDialogAlertProps): void => {
    setDialogAlertInfo({
      isOpenDialogAlert: true,
      dialogAlertInfo: { cancelText: "확인", ...dialogAlertInfo },
      headerInfo,
    });
  };

  return {
    openDialogAlert,
    closeDialogAlert,
    openConfirmDialogAlert,
  };
};
