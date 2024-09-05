import styles from "./styles.module.css";
import windowsStyles from "../../../styles/windows/styles.module.css";

import { TextBody03 } from "../../text";
import WithAction from "../../with-action";

import type { IWindowsHeaderProps } from "./types";
import type { ReactNode } from "react";

// windows 창의 윗 헤더 부분 UI 컴포넌트
export default function WindowsHeader({
  title,
  action,
  offCloseButton,
}: IWindowsHeaderProps): ReactNode {
  return (
    <header
      className={`${styles.windows__header} ${windowsStyles.windows__inner}`}
    >
      <TextBody03 useLineLimit={1}>{title}</TextBody03>

      {!offCloseButton && (
        <WithAction action={action}>
          <div className={styles.windows__close} />
        </WithAction>
      )}
    </header>
  );
}
