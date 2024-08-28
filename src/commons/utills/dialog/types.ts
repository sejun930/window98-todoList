import { IWindowsHeaderProps } from "@/commons/components/windows/header/types";

export interface IOpenDialogProps {
  headerInfo: IWindowsHeaderProps;
  children: React.ReactNode;
}

export interface IUseUtillDialogReturn {
  openDialog: (props: IOpenDialogProps) => void;
  closeDialog: () => void;
}
