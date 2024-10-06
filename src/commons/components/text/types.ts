export interface ITextBaseProps {
  children: string | React.ReactNode;
  className?: string;
  cssprop?: string;
  useLineLimit?: number;
  title?: string;
}

export type ITextCommonProps =
  // 메인 컴포넌트에서 호출할 때에는 제외할 props
  Omit<ITextBaseProps, "cssprop">;
