"use client";

import { TextBody03, TextBody04, TextTitle01 } from "@/commons/components/text";
import styles from "./styles.module.css";
import { Checkbox } from "@/commons/components/checkbox";
import type { ITodoListsListProps } from "./types";
import { useTodoListsList } from "./hook";

// Todo-list 리스트 노출 컴포넌트
export default function TodoListsList({ infos }: ITodoListsListProps) {
  const { items } = useTodoListsList({ infos });

  // 전체 Todo-list 개수
  const allData = infos?.items ?? 0;

  return (
    <section className={styles.section}>
      <div className={styles.option__wrapper}>
        <TextBody04>TOTAL : {allData}</TextBody04>
      </div>
      <ul className={styles.list__wrappre}>
        {items?.map(({ id, title, contents, createdAt, checked }, idx) => {
          // 마지막 리스트인지 체크
          const isLast = items?.length === idx + 1;

          let classNames = styles.list;
          if (isLast) classNames += ` ${styles.isLast}`;

          const uuid = `${id}-${createdAt}-${idx}`;

          return (
            <li key={uuid} className={classNames}>
              <div className={styles.title__wrapper}>
                <div className={styles.title__item}>
                  <Checkbox id={uuid} isChecked={checked ?? false} />
                  <TextTitle01>{title}</TextTitle01>
                </div>
              </div>

              <div className={styles.contents}>
                <TextBody03>{contents}</TextBody03>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
