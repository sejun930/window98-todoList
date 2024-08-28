import { create } from "zustand";
import type { IUseDialogInfo } from "./types";

// dialog 오픈 여부
export const useDialogInfoState: IUseDialogInfo = create((set) => ({
  dialogInfo: {
    isOpenDialog: false, // dialog 오픈 여부 (true 일 경우 오픈)
    children: <></>, // dialog 안에 노출되는 children 정보
    headerInfo: { title: "", action: { href: "" } }, // 상단 헤더 탭 정보
  },
  setDialogInfo: (newDialogInfo) => {
    set({ dialogInfo: { ...newDialogInfo } });
  },
}));
