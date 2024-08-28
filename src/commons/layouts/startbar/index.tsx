"use client";

import Link from "next/link";
import styles from "./styles.module.css";
import Image from "next/image";
import { TextBody04 } from "@/commons/components/text";

import { useUtillsRouter } from "@/commons/utills";

// 레이아웃의 하단 영역
export default function StartBar() {
  const { isTodoListPage } = useUtillsRouter();
  // 현재 페이지 경로가 "/todo-list" 경로인지 확인
  const isTodoList = isTodoListPage();

  return (
    <footer className={styles.footer}>
      <div className={styles.start}>
        <button>
          <Image src="/icons/window.webp" alt="start" width={0} height={0} />
          <TextBody04>시작</TextBody04>
        </button>
      </div>

      <div className={styles.items}>
        <div className={styles.current__wrapper}>
          {isTodoList && (
            // todoList 경로일 경우, 실행탭 UI 노출
            <div className={styles.current}>
              <TextBody04>Todo-List</TextBody04>
            </div>
          )}
        </div>
        <div className={styles.made}>
          Made By {""}
          <Link href="https://github.com/sejun930" target="_blank">
            sejun930
          </Link>
        </div>
      </div>
    </footer>
  );
}
