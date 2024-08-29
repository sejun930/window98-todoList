"use client";

import { useLayoutEffect, type ReactNode } from "react";
import styles from "./styles.module.css";
import windowsStyles from "../../styles/windows/styles.module.css";

import { usePathname, useRouter } from "next/navigation";
import { useUtillsRouter } from "@/commons/utills";

import WindowsHeader from "@/commons/components/windows/header";
import Dialog from "@/commons/components/dialog";

import {
  useDialogAlertInfoState,
  useDialogInfoState,
  useErrorInfoState,
} from "@/commons/zustand/store";
import { useUtillDialog } from "@/commons/utills/dialog";
import DialogAlert from "@/commons/components/dialog-alert";
import { useUtillDialogAlert } from "@/commons/utills/dialog-alert";
import Error from "@/components/commons/error";

interface ILayoutsContentsProps {
  children: ReactNode;
}

// 메인 콘텐츠 영역
export default function LayoutsContents({ children }: ILayoutsContentsProps) {
  const pathname = usePathname();
  const router = useRouter();

  // dialog 실행 및 정보 zustand
  const { dialogInfo } = useDialogInfoState();
  const { closeDialog } = useUtillDialog();
  const { closeDialogAlert } = useUtillDialogAlert();

  // dialog-alert 실행 및 정보 zustand
  const { dialogAlertInfo } = useDialogAlertInfoState();
  const useDialogAlert = dialogAlertInfo.isOpenDialogAlert ?? false;

  // Error 실행 및 정보 zustand
  const { errorInfo } = useErrorInfoState();
  const isShowError = errorInfo?.isShow ?? false;

  const { isTodoListPage } = useUtillsRouter();
  // 현재 페이지 경로가 "/todo-list" 경로인지 확인
  const isTodoList = isTodoListPage();

  // 닫기 버튼 클릭시, 이동 경로 분기
  const closeContents = () => {
    if (!isTodoList) return;
    // 상세 페이지가 아닌 경우 = "/" 페이지로 이동
    router.push("/");

    // 상세 페이지인 경우 = "/todo-list" 페이지로 이동
  };

  // 초기 렌더시, Dialog 종료
  useLayoutEffect(() => {
    closeDialog();
    closeDialogAlert();
  }, [pathname]);

  if (!isTodoList) return <></>;
  return (
    <div className={`${styles.windows} ${windowsStyles.windows__outline}`}>
      <WindowsHeader title="Todo-List" action={closeContents} />
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
                />
                <Error isShow={isShowError} errorType={errorInfo.errorType} />
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
