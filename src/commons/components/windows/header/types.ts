import { IAction } from "../../with-action/types";

export interface IWindowsHeaderProps {
  title: string; // 상단에 노출될 제목
  action: IAction;
  // 닫기 버튼 클릭시 실행될 이벤트나 이동 경로
  // 이벤트로 제공되면 버튼 태그로, href로 제공되면 링크 태그로 렌더
  offCloseButton?: boolean; // 종료 버튼 숨기기
}
