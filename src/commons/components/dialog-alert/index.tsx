import WindowsHeader from "../windows/header";
import styles from "./styles.module.css";
import windowsStyles from "../../styles/windows/styles.module.css";

import { TextBody02 } from "../text";
import { ButtonDangerousM, ButtonPrimaryM } from "../button";
import { useUtillDialogAlert } from "@/commons/utills/dialog-alert";

import type { IDialogAlertProps } from "./types";
import type { ReactNode } from "react";

// Dialog-alert 공통 컴포넌트
export default function DialogAlert({
  header,
  isOpen,
  alertInfo,
  onlyWait,
}: IDialogAlertProps): ReactNode {
  const { text } = alertInfo;
  const { closeDialogAlert } = useUtillDialogAlert();

  if (!isOpen) return <></>;
  return (
    <div
      className={`${styles.dialog__alert__wrapper} ${windowsStyles.windows__outline}`}
    >
      <div className={styles.dialog__item}>
        <WindowsHeader
          {...header}
          action={closeDialogAlert}
          offCloseButton={onlyWait}
        />
        <div
          className={`${styles.dialog__contents} ${windowsStyles.windows__inner}`}
        >
          <div className={styles.contents__text}>
            {typeof text === "string" ? <TextBody02>{text}</TextBody02> : text}
          </div>

          {!onlyWait && (
            <div className={styles.button__options}>
              <ButtonDangerousM onClick={closeDialogAlert}>
                취소
              </ButtonDangerousM>
              <ButtonPrimaryM onClick={alertInfo?.okEvent}>확인</ButtonPrimaryM>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
