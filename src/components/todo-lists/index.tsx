"use client";

import { type MutableRefObject, type ReactNode, useRef } from "react";
import styles from "./styles.module.css";
import Image from "next/image";

import { TextBody01, TextBody03 } from "@/commons/components/text";
import { useTodoLists } from "./hook";
import { Skeleton } from "@/commons/components/skeleton";

import WithInfiniteScroll from "@/commons/hocs/infinite-scroll";
import TodoListsListDetail from "./list-detail";
import Notice from "../commons/notice";

import type { ITodoListsListProps } from "./types";
import { useUtillsNumber } from "@/commons/utills";

// Todo-list 리스트 노출 컴포넌트
export default function TodoLists(props: ITodoListsListProps): ReactNode {
  // prettier-ignore
  const { items, fetchMore, hasNextPage, 
    openWriteDialog, isLoading, allData, hasItems } = useTodoLists({ ...props });
  const listWrapperRef = useRef() as MutableRefObject<HTMLUListElement>;

  const { withZeroNumber } = useUtillsNumber();

  return (
    <section className={styles.section}>
      <div className={styles.option__header}>
        <Skeleton isLoading={isLoading}>
          <TextBody01>LISTS : {withZeroNumber({ num: allData })}</TextBody01>
        </Skeleton>
        <button onClick={openWriteDialog}>
          <Image
            src="/icons/new-file-small.png"
            alt="등록"
            width={0}
            height={0}
          />
          <TextBody03>New List</TextBody03>
        </button>
      </div>
      <WithInfiniteScroll
        targetRef={listWrapperRef}
        fetchMore={fetchMore}
        disable={!hasNextPage}
      >
        <ul className={styles.list__wrapper} ref={listWrapperRef}>
          {/* 로딩 여부 */}
          <Notice isShow={isLoading} text="데이터 조회 중" />
          {/* 리스트 존재 여부 */}
          <Notice
            isShow={!hasItems && !isLoading}
            text="리스트가 비어있습니다."
          />

          {items?.map((info, idx) => {
            const { id, createdAt } = info;

            // 마지막 리스트인지 체크
            const isLast = items?.length === idx + 1;
            const uuid = `${id}-${createdAt}-${idx}`;

            return (
              <TodoListsListDetail
                key={uuid}
                uuid={uuid}
                info={info}
                allData={allData}
                isLoading={isLoading}
                isLast={isLast}
              />
            );
          })}
        </ul>
      </WithInfiniteScroll>
    </section>
  );
}
