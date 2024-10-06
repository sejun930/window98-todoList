"use client";

import { useLayoutEffect, type ReactNode } from "react";
import styles from "./styles.module.css";

import { TextBody01 } from "@/commons/components/text";
import { Skeleton } from "@/commons/components/skeleton";
import { Checkbox } from "@/commons/components/checkbox";

import { useDeletedHeader } from "./hook";
import { useUtillsNumber } from "@/commons/utills";

import DeletedHeaderClearList from "./clear-list";
import DeletedHeaderRecoveryList from "./recovery-list";

// 휴지통 상단 정보
export default function DeletedHeader(): ReactNode {
  const { withZeroNumber } = useUtillsNumber();
  const { allData, isLoading, toggleAllCheck, isAllCheck } = useDeletedHeader();

  useLayoutEffect(() => {
    return () => {
      // 페이지 이탈시, 모든 체크 리스트 삭제
      toggleAllCheck({ reset: true });
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.option__header}>
        <div className={styles.option__checkbox}>
          {/* 삭제 리스트 전체 선택 */}
          <Checkbox
            id="all-deleted"
            onClick={toggleAllCheck}
            isChecked={isAllCheck}
          />
          <Skeleton isLoading={isLoading}>
            <TextBody01>
              DELETED : {withZeroNumber({ num: allData })}
            </TextBody01>
          </Skeleton>
        </div>

        <div className={styles.option__buttons}>
          {/* 휴지통 비우기 */}
          <DeletedHeaderClearList />
          {/* 리스트 복원 */}
          <DeletedHeaderRecoveryList />
        </div>
      </div>
    </section>
  );
}
