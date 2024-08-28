import { useDialogAlertInfoState } from "@/commons/zustand/store";
import { IUseUtillDialogAlertReturn, IOpenDialogAlertProps } from "./types";

// Dialog-alert 관련 공통 함수 모음
export const useUtillDialogAlert = (): IUseUtillDialogAlertReturn => {
  const { setDialogAlertInfo } = useDialogAlertInfoState();
  // Dialog-alert 실행
  const openDialogAlert = ({
    headerInfo,
    dialogAlertInfo,
  }: IOpenDialogAlertProps) => {
    if (!dialogAlertInfo) return;

    setDialogAlertInfo({
      isOpenDialogAlert: true,
      headerInfo,
      dialogAlertInfo,
    });
  };

  // Dialog-alert 종료
  const closeDialogAlert = () => {
    setDialogAlertInfo({
      isOpenDialogAlert: false,
      headerInfo: { title: "" },
      dialogAlertInfo: { text: "", okEvent: () => {} },
    });
  };

  return {
    openDialogAlert,
    closeDialogAlert,
  };
};
