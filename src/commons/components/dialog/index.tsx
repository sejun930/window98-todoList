import WindowsHeader from "../windows/header";
import styles from "./styles.module.css";
import windowsStyles from "../../styles/windows/styles.module.css";

import { IDialogProps } from "./types";

// Dialog 공통 컴포넌트
export default function Dialog({ children, header, isOpen }: IDialogProps) {
  if (!isOpen) return <></>;
  return (
    <div
      className={`${styles.dialog__wrapper} ${windowsStyles.windows__outline}`}
    >
      <div className={styles.dialog__item}>
        <WindowsHeader {...header} />
        <div
          className={`${styles.dialog__contents} ${windowsStyles.windows__inner}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
