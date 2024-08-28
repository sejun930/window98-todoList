import { create } from "zustand";
import type { IUseDialogAlertInfo, IUseDialogInfo } from "./types";

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

// dialog-alert 오픈 여부
export const useDialogAlertInfoState: IUseDialogAlertInfo = create((set) => ({
  dialogAlertInfo: {
    isOpenDialogAlert: false, // dialog-alert 오픈 여부 (true 일 경우 오픈)
    headerInfo: { title: "", action: { href: "" } }, // 상단 헤더 탭 정보
    dialogAlertInfo: { text: "", okEvent: () => {} },
  },
  setDialogAlertInfo: (newDialogAlertInfo) => {
    set({ dialogAlertInfo: { ...newDialogAlertInfo } });
  },
}));
