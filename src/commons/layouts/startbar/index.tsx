"use client";

// import Link from "next/link";
import Link from "next/link";
import styles from "./styles.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";

// 레이아웃의 하단 영역
export default function StartBar() {
  const pathname = usePathname();
  // 현재 페이지 경로가 "/todoList" 경로인지 확인
  const isTodoList = pathname.includes("/todoList");

  return (
    <footer className={styles.footer}>
      <div className={styles.start}>
        <Image src="/icons/window.webp" alt="start" width={0} height={0} />
        <b>시작</b>
      </div>

      <div className={styles.items}>
        <div className={styles.current__wrapper}>
          {isTodoList && (
            // todoList 경로일 경우, 실행탭 UI 노출
            <div className={styles.current}>Todo-List</div>
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
