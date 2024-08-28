import WindowsHeader from "../windows/header";
import styles from "./styles.module.css";
import windowsStyles from "../../styles/windows/styles.module.css";

import { IDialogAlertProps } from "./types";
import { TextBody02 } from "../text";
import { ButtonDangerousM, ButtonPrimaryM } from "../button";

// Dialog-alert 공통 컴포넌트
export default function DialogAlert({
  header,
  isOpen,
  alertInfo,
}: IDialogAlertProps) {
  const { text } = alertInfo;

  if (!isOpen) return <></>;
  return (
    <div
      className={`${styles.dialog__alert__wrapper} ${windowsStyles.windows__outline}`}
    >
      <div className={styles.dialog__item}>
        <WindowsHeader {...header} />
        <div
          className={`${styles.dialog__contents} ${windowsStyles.windows__inner}`}
        >
          <div className={styles.contents__text}>
            <TextBody02>{text}</TextBody02>
          </div>
          <div className={styles.button__options}>
            <ButtonDangerousM>취소</ButtonDangerousM>
            <ButtonPrimaryM>확인</ButtonPrimaryM>
          </div>
        </div>
      </div>
    </div>
  );
}
