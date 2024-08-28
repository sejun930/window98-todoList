import WindowsHeader from "../windows/header";
import styles from "./styles.module.css";
import { IDialogAlertProps } from "./types";

// Dialog-alert 공통 컴포넌트
export default function DialogAlert({ header, isOpen }: IDialogAlertProps) {
  if (!isOpen) return <></>;
  return (
    <div className={styles.dialog__wrapper}>
      <div className={styles.dialog__item}>
        <WindowsHeader {...header} />
        <div className={styles.dialog__contents}></div>
      </div>
    </div>
  );
}
