import type { ReactNode } from "react";

export interface IUseLayoutsContentsReturn {
  closeContents: () => void;
  useWindow: boolean;
  windowTitle: string;
}

export interface ILayoutsContentsProps {
  children: ReactNode;
}
