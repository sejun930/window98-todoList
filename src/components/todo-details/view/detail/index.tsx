import styles from "./styles.module.css";
import CommonsTodoListsCheckbox from "@/components/commons/todo-lists/checkbox";
import CommonTodoListsButtonsDelete from "@/components/commons/todo-lists/buttons/delete";
import CommonTodoListsButtonsUpdate from "@/components/commons/todo-lists/buttons/update";
import { TextBody03, TextBody04 } from "@/commons/components/text";

import type { ITodoList } from "@/commons/types/todo-list";
import type { ReactNode } from "react";
import { useUtillsDate } from "@/commons/utills";

interface ITodoDetailViewDetailProps {
  info: ITodoList;
  isLoading: boolean;
}

// 리스트 상세의 상세 조회 컴포넌트
export default function TodoDetailViewDetail({
  info,
  isLoading,
}: ITodoDetailViewDetailProps): ReactNode {
  const { id, checked, title, createdAtTime, updatedAtTime, contents } = info;
  const { getTimeString } = useUtillsDate();

  const uuid = `${id}-${title}-${createdAtTime}`;

  // 등록일
  const createdAt = getTimeString(createdAtTime);
  // 수정일
  const updatedAt = getTimeString(updatedAtTime);
  // 수정 여부
  const hasUpdated = !!updatedAtTime;

  return (
    <section className={styles.section}>
      <div className={styles.option__wrapper}>
        <CommonsTodoListsCheckbox
          uuid={uuid}
          id={id}
          checked={checked}
          title={title}
          isLoading={isLoading}
        />
        <div className={styles.options}>
          <CommonTodoListsButtonsUpdate info={info} type="edit" />
          <CommonTodoListsButtonsDelete info={info} />
        </div>
      </div>
      <div className={styles.contents}>
        <TextBody03>{contents}</TextBody03>
      </div>
      <div className={styles.date__wrapper}>
        <TextBody04>등록 | {createdAt}</TextBody04>
        {hasUpdated && <TextBody04>수정 | {updatedAt}</TextBody04>}
      </div>
    </section>
  );
}
