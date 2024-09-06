import type { ReactNode } from "react";

export interface IUseLayoutsContentsReturn {
  resetDialogs: () => void;
  pathname: string;
  closeContents: () => void;
  useWindow: boolean;
  windowTitle: string;
}

export interface ILayoutsContentsProps {
  children: ReactNode;
}
