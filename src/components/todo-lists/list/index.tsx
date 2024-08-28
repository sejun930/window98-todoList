"use client";

import { memo } from "react";
import styles from "./styles.module.css";

import { TextBody03 } from "@/commons/components/text";
import { ITodoListsListProps } from "./types";

import TodoListsListCheckbox from "./checkbox";
import TodoListsListDelete from "./delete";
import TodoListsListUpdate from "./update";

// Todo-list에 대한 각각의 리스트 컴포넌트
const TodoListsList = ({ info, classNames, uuid }: ITodoListsListProps) => {
  const { checked, title, contents, id } = info;

  return (
    <li className={classNames}>
      <div className={styles.title__wrapper}>
        <TodoListsListCheckbox
          uuid={uuid}
          checked={checked}
          title={title}
          id={id}
        />
        <div className={styles.options}>
          {/* 수정 버튼 */}
          <TodoListsListUpdate info={info} />
          {/* 삭제 버튼 */}
          <TodoListsListDelete info={info} />
        </div>
      </div>

      <div className={styles.contents}>
        <TextBody03>{contents}</TextBody03>
      </div>
    </li>
  );
};

export default memo(TodoListsList);
