"use client";

import { TextBody04 } from "@/commons/components/text";
import styles from "./styles.module.css";
import type { ITodoListsListProps } from "./types";
import { useTodoLists } from "./hook";
import { ButtonPrimaryM } from "@/commons/components/button";
import Image from "next/image";
import TodoListsList from "./list";

// Todo-list 리스트 노출 컴포넌트
export default function TodoLists({ infos }: ITodoListsListProps) {
  const { items } = useTodoLists({ infos });

  // 전체 Todo-list 개수
  const allData = infos?.items ?? 0;

  return (
    <section className={styles.section}>
      <div className={styles.option__wrapper}>
        <TextBody04>TOTAL : {allData}</TextBody04>
        <ButtonPrimaryM>
          <Image
            src="/icons/new-file-small.png"
            alt="등록"
            width={0}
            height={0}
          />
          <TextBody04>새 파일</TextBody04>
        </ButtonPrimaryM>
      </div>
      <ul className={styles.list__wrapper}>
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
            />
          );
        })}
      </ul>
    </section>
  );
}
