import styles from "./styles.module.css";
import windowsStyles from "../../../styles/windows/styles.module.css";

import { TextBody03 } from "../../text";
import { IWindowsHeaderProps } from "./types";
import WithAction from "../../with-action";

// windows 창의 윗 헤더 부분 UI 컴포넌트
export default function WindowsHeader({ title, action }: IWindowsHeaderProps) {
  return (
    <header
      className={`${styles.windows__header} ${windowsStyles.windows__inner}`}
    >
      <TextBody03>{title}</TextBody03>
      <WithAction action={action}>
        <div className={styles.windows__close} />
      </WithAction>
    </header>
  );
}
