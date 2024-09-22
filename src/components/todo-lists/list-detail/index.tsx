"use client";

import { memo, type ReactNode } from "react";
import styles from "./styles.module.css";

import { TextBody03 } from "@/commons/components/text";
import CommonsTodoListsCheckbox from "@/components/commons/todo-lists/checkbox";
import CommonTodoListsButtonsDelete from "@/components/commons/todo-lists/buttons/delete";
import CommonTodoListsButtonsUpdate from "@/components/commons/todo-lists/buttons/update";
import { Skeleton } from "@/commons/components/skeleton";

import type { ITodoListsListProps } from "./types";

// Todo-list에 대한 각각의 리스트 컴포넌트
const TodoListsListDetail = ({
  info,
  classNames,
  uuid,
  isLoading,
}: ITodoListsListProps): ReactNode => {
  const { checked, title, contents, id } = info;

  return (
    <li className={classNames}>
      <div className={styles.title__wrapper}>
        <CommonsTodoListsCheckbox
          uuid={uuid}
          checked={checked}
          title={title}
          id={id}
          isLoading={isLoading}
        />
        <div className={styles.options}>
          {/* 수정 버튼 */}
          <CommonTodoListsButtonsUpdate info={info} type="dialog" />
          {/* 삭제 버튼 */}
          <CommonTodoListsButtonsDelete info={info} />
        </div>
      </div>

      <div className={styles.contents}>
        <Skeleton isLoading={isLoading}>
          <TextBody03>{contents}</TextBody03>
        </Skeleton>
      </div>
    </li>
  );
};

export default memo(TodoListsListDetail);
