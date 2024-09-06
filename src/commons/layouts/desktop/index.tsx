"use client";

import { useEffect, type ReactNode } from "react";
import styles from "./styles.module.css";
import Image from "next/image";

import { DESKTOP_LISTS } from "./constants";
import { Skeleton } from "@/commons/components/skeleton";
import { TextBody04 } from "@/commons/components/text";
import { useLayoutsDesktop } from "./hook";
import { useDesktopInfo } from "@/commons/zustand/store";

// 레이아웃의 왼쪽 영역 아이콘들
export default function LayoutsDesktop(): ReactNode {
  const {
    isLoading,
    WithLink,
    initTodoListIcon,
    hasItems,
    initDeleteTodoListIcon,
    hasDeleted,
  } = useLayoutsDesktop();
  const { desktopInfo } = useDesktopInfo();

  // 리스트 존재 여부에 따른 "Todo-list" 아이콘 분기
  useEffect(() => {
    initTodoListIcon();
  }, [hasItems]);

  // 삭제 리스트 존재 여부에 따른 "휴지통" 아이콘 분기
  useEffect(() => {
    initDeleteTodoListIcon();
  }, [hasDeleted]);

  return (
    <article className={styles.wrapper}>
      {DESKTOP_LISTS?.map(({ name, src, href, isBlank, targetState }) => {
        // targetState 옵션 사용 여부
        const hasTargetState = !!targetState;
        // state 상태값
        let targetStateStatus = false;

        if (hasTargetState)
          // 현재 저장되어 있는 zustand 에서 상태값 조회
          targetStateStatus = desktopInfo?.[targetState.name] ?? false;

        // 데스크탑에 노출될 최종 아이콘 이미지
        const desktopSrc = targetStateStatus ? targetState?.src : src;

        return (
          <div key={`desktop-${name}-${desktopSrc}`} className={styles.app}>
            {WithLink({
              children: (
                <div className={styles.item}>
                  <Skeleton isLoading={isLoading && hasTargetState}>
                    <div className={styles.image}>
                      <Image
                        src={`/icons/${desktopSrc}.png`}
                        alt={name}
                        layout="fill"
                      />
                    </div>
                  </Skeleton>

                  <TextBody04>{name}</TextBody04>
                </div>
              ),
              href,
              isBlank,
            })}
          </div>
        );
      })}
    </article>
  );
}
