"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";

import { DESKTOP_LISTS } from "./constants";
import type { IWithLinkProps } from "./types";

import { TextBody04 } from "@/commons/components/text";
import { useDesktopInfo } from "@/commons/zustand/store";
import type { ReactNode } from "react";

// 레이아웃의 왼쪽 영역 아이콘들
export default function LayoutsDesktop(): ReactNode {
  const { desktopInfo } = useDesktopInfo();

  // 이동 경로가 있을 경우, Link 태그와 함께 사용
  const withLink = ({ children, href, isBlank }: IWithLinkProps): ReactNode => {
    if (href)
      return (
        <Link href={href} target={isBlank ? "_blank" : "_self"}>
          {children}
        </Link>
      );

    return children;
  };

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
            {withLink({
              children: (
                <div className={styles.item}>
                  <div className={styles.image}>
                    <Image
                      src={`/icons/${desktopSrc}.png`}
                      alt={name}
                      layout="fill"
                    />
                  </div>

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
