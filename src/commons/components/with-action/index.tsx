import Link from "next/link";
import type { IWithActionProps } from "./types";
import type { ReactNode } from "react";

// action props의 타입값에 따라 버튼 및 링크 태그 분기 렌더하는 컴포넌트
// object 타입과 href 값 = 링크 태그로 노출
export default function WithAction({
  action,
  children,
}: IWithActionProps): ReactNode {
  // 함수 형태로 전달되었는지 체크 = 버튼 태그 노출
  const isButton = typeof action === "function";
  // 객체 형태로 전달되었으며, href가 있는지 체크 = 링크 태그 노출
  const isObject = typeof action === "object" && !!action.href;

  // 함수 이벤트 실행
  const onClickAction = (): void => {
    if (isButton) void action();
  };

  if (isButton) return <button onClick={onClickAction}>{children}</button>;
  else if (isObject) return <Link href={action.href}>{children}</Link>;

  return children;
}
