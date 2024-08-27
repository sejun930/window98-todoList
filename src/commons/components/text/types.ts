import type { ReactNode } from "react";

// type ITextType = "Body01" | "Body02" | "Body03" | "Caption01" | "Caption02";

export interface ITextBaseProps {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  cssprop?: string;
}

export interface ITextCommonProps
  // 메인 컴포넌트에서 호출할 때에는 제외할 props
  extends Omit<ITextBaseProps, "cssprop"> {}
