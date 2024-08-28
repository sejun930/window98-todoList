export interface IWindowsHeaderProps {
  title: string; // 상단에 노출될 제목
  action: (() => void | Promise<void>) | { href: string };
  // 닫기 버튼 클릭시 실행될 이벤트나 이동 경로
  // 이벤트로 제공되면 버튼 태그로, href로 제공되면 링크 태그로 렌더
}
