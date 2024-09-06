"use client";

import Link from "next/link";
import styles from "./styles.module.css";
import Image from "next/image";
import { TextBody04 } from "@/commons/components/text";

import type { ReactNode } from "react";
import { useUtillsParams } from "@/commons/utills/params";
import { URL_INFO } from "@/commons/constants/URL_info";
import { usePathname } from "next/navigation";

// 레이아웃의 하단 영역
export default function StartBar(): ReactNode {
  const pathname = usePathname();
  const { getAllParamsId } = useUtillsParams();
  const ids = getAllParamsId();

  // 경로별 해당하는 정보 및 기능 객체 조회
  const { INFOS } = URL_INFO(ids);

  const currentInfo = INFOS[pathname];
  // window 창 사용 여부
  const useWindow = !!currentInfo?.useWindow?.title;
  // window 제목
  const windowTitle = currentInfo?.useWindow?.title ?? "";

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
          {useWindow && (
            // todoList 경로일 경우, 실행탭 UI 노출
            <div className={styles.current}>
              <TextBody04>{windowTitle}</TextBody04>
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
