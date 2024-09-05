import type { IWindowsHeaderProps } from "@/commons/components/windows/header/types";

export interface IOpenDialogProps {
  headerInfo: IWindowsHeaderProps;
  children: React.ReactNode;
}

export interface IcloseDialogProps {
  originData: { title: string; contents: string };
}

export interface IUseUtillDialogReturn {
  openDialog: (props: IOpenDialogProps) => void;
  closeDialog: (props?: IcloseDialogProps) => void;
}
