import type { ReactNode } from "react";

export interface IButtonBaseProps {
  children: ReactNode;
  className?: string;
  theme: "primary" | "dangerous";
  size: "s" | "m" | "l" | "fit";
  onClick?: () => void | Promise<void>;
  disable?: boolean;
  active?: boolean;
}

export type IButtonCommonProps =
  // 메인 컴포넌트에서 호출할 때에는 제외할 props
  Omit<IButtonBaseProps, "cssprop" | "theme" | "size">;
