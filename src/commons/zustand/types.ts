import type { StoreApi, UseBoundStore } from "zustand";
import { IWindowsHeaderProps } from "../components/windows/header/types";

export interface IDialogInfoProps {
  isOpenDialog: boolean;
  children: React.ReactNode;
  headerInfo: IWindowsHeaderProps;
}
// dialog 정보
// prettier-ignore
export type IUseDialogInfo = UseBoundStore<
  StoreApi<{
    dialogInfo: IDialogInfoProps;
    setDialogInfo: (props: IDialogInfoProps) => void;
  }>
>;
