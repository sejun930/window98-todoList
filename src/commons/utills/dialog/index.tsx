import { useDialogInfoState } from "@/commons/zustand/store";
import {
  IcloseDialogProps,
  IOpenDialogProps,
  IUseUtillDialogReturn,
} from "./types";

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
  const closeDialog = (prosp?: IcloseDialogProps) => {
    // 제목이 기입되어 있는지
    const title =
      (document.getElementById("write-title") as HTMLInputElement)?.value ?? "";
    // 내용이 기입되어 있는지
    const textarea =
      (document.getElementById("write-contents") as HTMLTextAreaElement)
        ?.value ?? "";

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
