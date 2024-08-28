import { useDialogInfoState } from "@/commons/zustand/store";
import { IOpenDialogProps, IUseUtillDialogReturn } from "./types";

// Dialog 관련 공통 함수 모음
export const useUtillDialog = (): IUseUtillDialogReturn => {
  const { setDialogInfo } = useDialogInfoState();

  // Dialog 실행
  const openDialog = ({ headerInfo, children }: IOpenDialogProps) => {
    if (!children) return;

    setDialogInfo({
      isOpenDialog: true,
      headerInfo,
      children,
    });
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
