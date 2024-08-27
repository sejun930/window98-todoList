import type { ReactNode } from "react";

export interface ITextBaseProps {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  cssprop?: string;
}

export type ITextCommonProps =
  // 메인 컴포넌트에서 호출할 때에는 제외할 props
  Omit<ITextBaseProps, "cssprop">;
