"use client";

import type { ReactNode } from "react";
import styles from "./styles.module.css";
import { usePathname, useRouter } from "next/navigation";

interface ILayoutsContentsProps {
  children: ReactNode;
}

// 메인 콘텐츠 영역
export default function LayoutsContents({ children }: ILayoutsContentsProps) {
  const pathname = usePathname();
  const router = useRouter();

  // 현재 페이지 경로가 "/todoList" 경로인지 확인
  const isTodoList = pathname.includes("/todoList");

  // 닫기 버튼 클릭시, 이동 경로 분기
  const closeContents = () => {
    if (!isTodoList) return;
    // 상세 페이지가 아닌 경우 = "/" 페이지로 이동
    router.replace("/");

    // 상세 페이지인 경우 = "/todoList" 페이지로 이동
  };

  if (!isTodoList) return <></>;
  return (
    <div>
      <div className={styles.contents__wrapper}>
        <header className={styles.contents__header}>
          <span>Todo-List</span>
          <button className={styles.close} onClick={closeContents} />
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
