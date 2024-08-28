import { IWindowsHeaderProps } from "../windows/header/types";

export interface IDialogProps {
  children: React.ReactNode;
  header: IWindowsHeaderProps;
  isOpen: boolean;
}
