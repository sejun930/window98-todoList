"use client";

import { TextBody04 } from "@/commons/components/text";
import styles from "./styles.module.css";
import type { ITodoListsListProps } from "./types";
import { useTodoLists } from "./hook";
import { ButtonPrimaryM } from "@/commons/components/button";
import Image from "next/image";
import TodoListsList from "./list";
import InfiniteScroll from "@/commons/hocs/infinite-scroll";
import { MutableRefObject, useRef } from "react";
import Dialog from "@/commons/components/dialog";

// Todo-list 리스트 노출 컴포넌트
export default function TodoLists({ infos }: ITodoListsListProps) {
  const { items, fetchMore, hasNextPage, toggleDialog, openDialog } =
    useTodoLists({
      infos,
    });
  const listWrapperRef = useRef() as MutableRefObject<HTMLUListElement>;

  // 전체 Todo-list 개수
  const allData = infos?.items ?? 0;

  return (
    <section className={styles.section}>
      <div className={styles.option__wrapper}>
        <TextBody04>TOTAL : {allData}</TextBody04>
        <ButtonPrimaryM onClick={toggleDialog(true)}>
          <Image
            src="/icons/new-file-small.png"
            alt="등록"
            width={0}
            height={0}
          />
          <TextBody04>새 파일</TextBody04>
        </ButtonPrimaryM>
      </div>
      <InfiniteScroll
        targetRef={listWrapperRef}
        fetchMore={fetchMore}
        disable={!hasNextPage}
      >
        <ul className={styles.list__wrapper} ref={listWrapperRef}>
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
              />
            );
          })}
        </ul>
      </InfiniteScroll>

      <Dialog
        header={{
          title: "리스트 등록",
          action: toggleDialog(false),
        }}
        isOpen={openDialog}
      >
        등록 페이지에요
      </Dialog>
    </section>
  );
}
