import { create } from "zustand";
import type {
  IUseDesktopInfo,
  IUseDialogAlertInfo,
  IUseDialogInfo,
  IUseErrorInfo,
} from "./types";

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
    onlyWait: false,
  },
  setDialogAlertInfo: (newDialogAlertInfo) => {
    set({ dialogAlertInfo: { ...newDialogAlertInfo } });
  },
}));

// Error 코드 및 실행 관리
export const useErrorInfoState: IUseErrorInfo = create((set) => ({
  errorInfo: {
    isShow: false,
    errorType: "400",
  },
  setErrorInfo: (newErrorInfo) => {
    set({ errorInfo: { ...newErrorInfo } });
  },
}));

// 리스트 존재 여부 및 삭제 데이터 존재 여부 정보 저장
export const useDesktopInfo: IUseDesktopInfo = create((set) => ({
  desktopInfo: {
    hasRecycle: false,
    hasTodoList: true,
  },
  setDesktopInfo: (newDesktop) => {
    set((state) => {
      return { desktopInfo: { ...state.desktopInfo, ...newDesktop } };
    });
  },
}));
