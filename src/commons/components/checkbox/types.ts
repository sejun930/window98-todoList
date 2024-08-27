export interface ICheckboxBaseProps {
  className?: string;
  isLoading?: boolean;
  isChecked?: boolean; // 체크 여부
  id: string;
}

export type ICheckboxCommonProps =
  // 메인 컴포넌트에서 호출할 때에는 제외할 props
  Omit<ICheckboxBaseProps, "cssprop">;
