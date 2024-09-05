import WindowsHeader from "../windows/header";
import styles from "./styles.module.css";
import windowsStyles from "../../styles/windows/styles.module.css";

import { useDialogAlertInfoState } from "@/commons/zustand/store";

import type { IDialogProps } from "./types";
import type { ReactNode } from "react";

// Dialog 공통 컴포넌트
export default function Dialog({
  children,
  header,
  isOpen,
}: IDialogProps): ReactNode {
  const { dialogAlertInfo } = useDialogAlertInfoState();
  // dialog-alert을 사용중인지
  const useOpenDialogAlert = dialogAlertInfo.isOpenDialogAlert;

  let wrapperClassNames = `${styles.dialog__wrapper} ${windowsStyles.windows__outline}`;
  if (useOpenDialogAlert) wrapperClassNames += ` ${styles.use__dialog__alert}`;

  if (!isOpen) return <></>;
  return (
    <div className={wrapperClassNames}>
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
