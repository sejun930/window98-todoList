import { useDialogInfoState } from "@/commons/zustand/store";
import { IOpenDialogProps, IUseUtillDialogReturn } from "./types";
import { useUtillDialogAlert } from "../dialog-alert";

// Dialog 관련 공통 함수 모음
export const useUtillDialog = (): IUseUtillDialogReturn => {
  const { setDialogInfo } = useDialogInfoState();
  const { closeDialogAlert } = useUtillDialogAlert();

  // Dialog 실행
  const openDialog = ({ headerInfo, children }: IOpenDialogProps) => {
    if (!children) return;

    setDialogInfo({
      isOpenDialog: true,
      headerInfo,
      children,
    });
    // dialog-alert은 모두 종료
    closeDialogAlert();
  };

  // Dialog 종료
  const closeDialog = () => {
    setDialogInfo({
      isOpenDialog: false,
      children: <></>,
      headerInfo: { title: "", action: () => {} },
    });
  };

  return {
    openDialog,
    closeDialog,
  };
};
