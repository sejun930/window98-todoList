import styles from "./styles.module.css";
import windowsStyles from "../../../styles/windows/styles.module.css";

import { TextBody03 } from "../../text";
import { IWindowsHeaderProps } from "./types";
import Link from "next/link";

// windows 창의 윗 헤더 부분 UI 컴포넌트
export default function WindowsHeader({ title, action }: IWindowsHeaderProps) {
  // 액션 종류에 따른 태그별 렌더
  const RenderWithAction = () => {
    const CLOSE = <div className={styles.windows__close} />;

    if (typeof action === "object" && action?.href) {
      // 객체로 전달될 경우, Link 태그로 렌더
      return <Link href={action.href}>{CLOSE}</Link>;
    } else if (typeof action === "function") {
      // 함수로 전달될 경우, Button 태그로 렌더
      return <button onClick={action}>{CLOSE}</button>;
    }
    return CLOSE;
  };

  return (
    <header
      className={`${styles.windows__header} ${windowsStyles.windows__inner}`}
    >
      <TextBody03>{title}</TextBody03>
      {RenderWithAction()}
    </header>
  );
}
