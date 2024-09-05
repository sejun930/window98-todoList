"use client";

import styles from "./styles.module.css";
import Image from "next/image";

import { TextBody01, TextBody04, TextTitle01 } from "@/commons/components/text";
import { useTodoLists } from "./hook";
import { ButtonPrimaryM } from "@/commons/components/button";
import TodoListsList from "./list";
import WithInfiniteScroll from "@/commons/hocs/infinite-scroll";
import { type MutableRefObject, type ReactNode, useRef } from "react";
import { Skeleton } from "@/commons/components/skeleton";

// Todo-list 리스트 노출 컴포넌트
export default function TodoLists(): ReactNode {
  const { items, fetchMore, hasNextPage, openWriteDialog, isLoading, allData } =
    useTodoLists();
  const listWrapperRef = useRef() as MutableRefObject<HTMLUListElement>;

  // 데이터 존재 여부 반환
  const hasItems = allData > 0 ?? false;

  return (
    <section className={styles.section}>
      <div className={styles.option__wrapper}>
        <Skeleton isLoading={isLoading}>
          <TextBody01>TOTAL : {String(allData).padStart(2, "0")}</TextBody01>
        </Skeleton>
        <ButtonPrimaryM onClick={openWriteDialog}>
          <Image
            src="/icons/new-file-small.png"
            alt="등록"
            width={0}
            height={0}
          />
          <TextBody04>새 파일</TextBody04>
        </ButtonPrimaryM>
      </div>
      <WithInfiniteScroll
        targetRef={listWrapperRef}
        fetchMore={fetchMore}
        disable={!hasNextPage}
      >
        <ul className={styles.list__wrapper} ref={listWrapperRef}>
          {isLoading && (
            <li className={styles.empty}>
              <TextTitle01>데이터 조회 중</TextTitle01>
            </li>
          )}

          {!hasItems && !isLoading && (
            <li className={styles.empty}>
              <TextTitle01>리스트가 비어있습니다.</TextTitle01>
            </li>
          )}

          {items?.map((info, idx) => {
            const { id, createdAt } = info;

            // 마지막 리스트인지 체크
            const isLast = items?.length === idx + 1;

            let classNames = styles.list;
            if (isLast) classNames += ` ${styles.isLast}`;

            const uuid = `${id}-${createdAt}-${idx}`;

            return (
              <TodoListsList
                key={uuid}
                uuid={uuid}
                classNames={classNames}
                info={info}
                allData={allData}
                isLoading={isLoading}
              />
            );
          })}
        </ul>
      </WithInfiniteScroll>
    </section>
  );
}
