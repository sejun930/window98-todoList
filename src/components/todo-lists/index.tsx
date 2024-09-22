"use client";

import { type MutableRefObject, type ReactNode, useRef } from "react";
import styles from "./styles.module.css";
import Image from "next/image";

import { TextBody01, TextBody04, TextTitle01 } from "@/commons/components/text";
import { useTodoLists } from "./hook";
import { Skeleton } from "@/commons/components/skeleton";

import WithInfiniteScroll from "@/commons/hocs/infinite-scroll";
import TodoListsListDetail from "./list-detail";

// Todo-list 리스트 노출 컴포넌트
export default function TodoLists(): ReactNode {
  // prettier-ignore
  const { items, fetchMore, hasNextPage, 
    openWriteDialog, isLoading, allData, hasItems } = useTodoLists();
  const listWrapperRef = useRef() as MutableRefObject<HTMLUListElement>;

  return (
    <section className={styles.section}>
      <div className={styles.option__header}>
        <Skeleton isLoading={isLoading}>
          <TextBody01>LISTS : {String(allData).padStart(2, "0")}</TextBody01>
        </Skeleton>
        <button onClick={openWriteDialog}>
          <Image
            src="/icons/new-file-small.png"
            alt="등록"
            width={0}
            height={0}
          />
          <TextBody04>새 파일</TextBody04>
        </button>
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
              <TodoListsListDetail
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
