import styles from "./styles.module.css";
import CommonsTodoListsCheckbox from "@/components/commons/todo-lists/checkbox";
import CommonTodoListsButtonsDelete from "@/components/commons/todo-lists/buttons/delete";
import CommonTodoListsButtonsUpdate from "@/components/commons/todo-lists/buttons/update";
import { TextBody04 } from "@/commons/components/text";

import type { ITodoList } from "@/commons/types/todo-list";
import type { ReactNode } from "react";

interface ITodoDetailViewDetailProps {
  info: ITodoList;
  isLoading: boolean;
}

// 리스트 상세의 상세 조회 컴포넌트
export default function TodoDetailViewDetail({
  info,
  isLoading,
}: ITodoDetailViewDetailProps): ReactNode {
  const { id, checked, title, createdAtTime, contents } = info;
  const uuid = `${id}-${title}-${createdAtTime}`;

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
        <TextBody04>{contents}</TextBody04>
      </div>
    </section>
  );
}
