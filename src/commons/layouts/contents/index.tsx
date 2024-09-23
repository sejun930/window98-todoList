"use client";

import { useLayoutEffect, type ReactNode } from "react";
import styles from "./styles.module.css";
import windowsStyles from "../../styles/windows/styles.module.css";

import WindowsHeader from "@/commons/components/windows/header";
import Dialog from "@/commons/components/dialog";
import DialogAlert from "@/commons/components/dialog-alert";

import type { ILayoutsContentsProps } from "./types";
import { useLayoutsContents } from "./hook";
import {
  useDialogAlertInfoState,
  useDialogInfoState,
} from "@/commons/zustand/store";

// 메인 콘텐츠 영역
export default function LayoutsContents({
  children,
}: ILayoutsContentsProps): ReactNode {
  const { resetDialogs, pathname, closeContents, useWindow, windowTitle } =
    useLayoutsContents();

  // dialog 실행 및 정보 zustand
  const { dialogInfo } = useDialogInfoState();

  // dialog-alert 실행 및 정보 zustand
  const { dialogAlertInfo } = useDialogAlertInfoState();
  const useDialogAlert = dialogAlertInfo.isOpenDialogAlert ?? false;

  // 초기 렌더시, Dialog 종료
  useLayoutEffect(() => {
    resetDialogs();
  }, [pathname]);

  if (!useWindow) return <></>;
  return (
    <div className={`${styles.windows} ${windowsStyles.windows__outline}`}>
      <WindowsHeader title={windowTitle} action={closeContents} />
      <div className={styles.contents__item}>
        <div className={styles.contents__inner}>
          <div className={styles.contents__inline}>
            <div className={styles.contents__wrap}>
              <main className={styles.main}>
                {useDialogAlert && <div className={styles.bg} />}
                {children}
                <Dialog
                  isOpen={dialogInfo?.isOpenDialog ?? false}
                  header={dialogInfo?.headerInfo ?? {}}
                >
                  {dialogInfo?.children}
                </Dialog>
                <DialogAlert
                  isOpen={dialogAlertInfo?.isOpenDialogAlert ?? false}
                  header={dialogAlertInfo?.headerInfo ?? {}}
                  alertInfo={dialogAlertInfo?.dialogAlertInfo ?? {}}
                  onlyWait={dialogAlertInfo?.onlyWait ?? false}
                />
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
