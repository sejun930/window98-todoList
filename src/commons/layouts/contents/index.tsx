"use client";

import type { ReactNode } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { TextBody03 } from "@/commons/components/text";
import { useUtillsRouter } from "@/commons/utills";

interface ILayoutsContentsProps {
  children: ReactNode;
}

// 메인 콘텐츠 영역
export default function LayoutsContents({ children }: ILayoutsContentsProps) {
  const router = useRouter();

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

  if (!isTodoList) return <></>;
  return (
    <div>
      <div className={styles.contents__wrapper}>
        <header className={styles.contents__header}>
          <TextBody03>Todo-List</TextBody03>
          <button onClick={closeContents} />
        </header>
        <div className={styles.contents__item}>
          <div className={styles.contents__outline}>
            <div className={styles.contents__inline}>
              <div className={styles.contents__wrap}>
                <main>{children}</main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
