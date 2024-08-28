export interface ICheckboxBaseProps {
  className?: string;
  isLoading?: boolean;
  isChecked?: boolean; // 체크 여부
  id: string;
  onClick: () => void | Promise<void>; // toogle 실행 이벤트
}

export type ICheckboxCommonProps =
  // 메인 컴포넌트에서 호출할 때에는 제외할 props
  Omit<ICheckboxBaseProps, "cssprop">;
