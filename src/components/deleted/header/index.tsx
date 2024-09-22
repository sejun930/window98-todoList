"use client";

import { useLayoutEffect, type ReactNode } from "react";
import styles from "./styles.module.css";

import { TextBody01 } from "@/commons/components/text";
import { Skeleton } from "@/commons/components/skeleton";
import { Checkbox } from "@/commons/components/checkbox";
import { useDeletedHeader } from "./hook";

import { DeletedHeaderRestoreDeletedAt } from "./restore-deletedAt";
import DeletedHeaderDelete from "./delete";

// 휴지통 상단 정보
export default function DeletedHeader(): ReactNode {
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
              DELETED : {String(allData).padStart(2, "0")}
            </TextBody01>
          </Skeleton>
        </div>

        <div className={styles.option__buttons}>
          {/* 삭제 버튼 */}
          <DeletedHeaderDelete />
          {/* 복원 버튼 */}
          <DeletedHeaderRestoreDeletedAt />
        </div>
      </div>
    </section>
  );
}
