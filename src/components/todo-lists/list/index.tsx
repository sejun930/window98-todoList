"use client";

import styles from "./styles.module.css";
import Image from "next/image";

import { Checkbox } from "@/commons/components/checkbox";
import { TextBody03, TextBody04, TextTitle02 } from "@/commons/components/text";
import { ButtonPrimary } from "@/commons/components/button";
import { ITodoListsListProps } from "./types";
import { useTodoListsList } from "./hook";
import { memo, MutableRefObject, useLayoutEffect, useRef } from "react";

// Todo-list에 대한 각각의 리스트 컴포넌트
const TodoListsList = ({
  info,
  classNames,
  uuid,
  allData,
}: ITodoListsListProps) => {
  const titleItemRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { checked, title, contents, id } = info;
  const { toggleChecked, openDeleteConfirm } = useTodoListsList({
    id,
    checked,
    allData,
  });

  useLayoutEffect(() => {
    if (!titleItemRef?.current) return;

    // 체크가 되어 있다면 추가 스타일을 위한 클래스 네임 추가
    if (checked) titleItemRef.current.classList.add(styles.checked);
    // 비체크일 경우 기존의 클래스 네임 삭제
    else titleItemRef.current.classList.remove(styles.checked);
  }, [checked]);

  return (
    <li className={classNames}>
      <div className={styles.title__wrapper}>
        <div className={styles.title__item} ref={titleItemRef}>
          <Checkbox
            id={uuid}
            isChecked={checked ?? false}
            onClick={toggleChecked}
          />
          <TextTitle02 useLineLimit={1}>{title}</TextTitle02>
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

          <ButtonPrimary onClick={openDeleteConfirm(info)}>
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
