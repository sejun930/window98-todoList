"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

import { TextBody01, TextBody04 } from "@/commons/components/text";
import { Skeleton } from "@/commons/components/skeleton";
import { Checkbox } from "@/commons/components/checkbox";
import { ButtonPrimaryM } from "@/commons/components/button";
import { useDeletedList } from "./hook";

// 휴지통 컴포넌트 페이지
export default function DeletedList(): ReactNode {
  const { allData, isLoading } = useDeletedList();

  return (
    <section className={styles.section}>
      <div className={styles.option__header}>
        <div className={styles.option__checkbox}>
          <Checkbox id="all-deleted" />
          <Skeleton isLoading={isLoading}>
            <TextBody01>
              DELETED : {String(allData).padStart(2, "0")}
            </TextBody01>
          </Skeleton>
        </div>

        <div className={styles.option__buttons}>
          <ButtonPrimaryM>
            <Image
              src="/icons/recycle-small.png"
              alt="선택 비우기"
              width={0}
              height={0}
            />
            <TextBody04>선택 비우기</TextBody04>
          </ButtonPrimaryM>

          <ButtonPrimaryM>
            <TextBody04>선택 복원</TextBody04>
          </ButtonPrimaryM>
        </div>
      </div>
    </section>
  );
}
