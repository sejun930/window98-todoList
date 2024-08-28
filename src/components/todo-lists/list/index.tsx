"use client";

import styles from "./styles.module.css";
import Image from "next/image";

import { Checkbox } from "@/commons/components/checkbox";
import { TextBody03, TextBody04, TextTitle02 } from "@/commons/components/text";
import { ButtonPrimary } from "@/commons/components/button";
import { ITodoListsListProps } from "./types";
import { useTodoListsList } from "./hook";
import { memo } from "react";

// Todo-list에 대한 각각의 리스트 컴포넌트
const TodoListsList = ({ info, classNames, uuid }: ITodoListsListProps) => {
  const { checked, title, contents, id } = info;
  const { toggleChecked } = useTodoListsList({ id, checked });

  return (
    <li className={classNames}>
      <div className={styles.title__wrapper}>
        <div className={styles.title__item}>
          <Checkbox
            id={uuid}
            isChecked={checked ?? false}
            onClick={toggleChecked}
          />
          <TextTitle02>{title}</TextTitle02>
        </div>
        <div className={styles.options}>
          <ButtonPrimary>
            <Image
              src="/icons/update-small.png"
              alt="수정"
              width={0}
              height={0}
            />
            <TextBody04>수정</TextBody04>
          </ButtonPrimary>

          <ButtonPrimary>
            <Image
              src="/icons/recycle-small.png"
              alt="수정"
              width={0}
              height={0}
            />
            <TextBody04>삭제</TextBody04>
          </ButtonPrimary>
        </div>
      </div>

      <div className={styles.contents}>
        <TextBody03>{contents}</TextBody03>
      </div>
    </li>
  );
};

export default memo(TodoListsList);
