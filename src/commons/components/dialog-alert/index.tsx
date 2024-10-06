import WindowsHeader from "../windows/header";
import styles from "./styles.module.css";
import windowsStyles from "../../styles/windows/styles.module.css";

import { TextBody02 } from "../text";
import { Button } from "../button";
import { useUtillsDialogAlert } from "@/commons/utills/dialog-alert";

import type { IDialogAlertProps } from "./types";
import {
  useEffect,
  useRef,
  type ReactNode,
  type MutableRefObject,
} from "react";

// Dialog-alert 공통 컴포넌트
export default function DialogAlert({
  header,
  isOpen,
  alertInfo,
  onlyWait,
}: IDialogAlertProps): ReactNode {
  const { text, okText, cancelText, okEvent } = alertInfo;
  const { closeDialogAlert } = useUtillsDialogAlert();

  const okButtonRef = useRef() as MutableRefObject<HTMLButtonElement>;

  // 키 이벤트를 통한 Dialog-alert 종료 감지 이벤트
  const leaveDialogAlertByKeyEvent = (e: KeyboardEvent): void => {
    const KEY = e.key;

    switch (KEY) {
      case "Escape":
        // ESC 키 입력시, 자동 Dialog-alert 닫기
        closeDialogAlert();
        break;

      case "Enter":
        // Enter 키 입력시,
        // 자동 Dialog-alert 닫기
        closeDialogAlert();

        // okEvent 자동 실행
        if (!okButtonRef?.current) return;
        okButtonRef.current.click();

        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", leaveDialogAlertByKeyEvent, true);

    return () => {
      window.removeEventListener("keyup", leaveDialogAlertByKeyEvent);
    };
  }, []);

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
              <Button onClick={closeDialogAlert} theme="dangerous" size="m">
                {cancelText ?? "Cancel"}
              </Button>

              {okEvent && (
                <Button
                  onClick={okEvent}
                  theme="primary"
                  size="m"
                  ref={okButtonRef}
                >
                  {okText ?? "확인"}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
