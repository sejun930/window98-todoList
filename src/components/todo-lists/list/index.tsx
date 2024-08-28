"use client";

import { memo } from "react";
import styles from "./styles.module.css";
import Image from "next/image";

import { TextBody03, TextBody04 } from "@/commons/components/text";
import { ButtonPrimary } from "@/commons/components/button";
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
          <TodoListsListUpdate info={info} />
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
