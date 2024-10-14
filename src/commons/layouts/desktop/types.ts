import type { ReactNode } from "react";

export interface IWithLinkProps {
  children: React.ReactNode;
  href?: string;
  isBlank?: boolean;
}

export interface IUseLayoutsDesktopReturn {
  isLoading: boolean;
  WithLink: ({ children, href, isBlank }: IWithLinkProps) => ReactNode;
}
