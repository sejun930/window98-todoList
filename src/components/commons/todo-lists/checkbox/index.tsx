import styles from "./styles.module.css";
import {
  type MutableRefObject,
  type ReactNode,
  useLayoutEffect,
  useRef,
} from "react";

import { Checkbox } from "@/commons/components/checkbox";
import { TextTitle02 } from "@/commons/components/text";
import type { ICommonsTodoListsCheckboxProps } from "./types";
import { useServerUtillsTodoListsUpdate } from "@/server/utills/todo-lists";
import Link from "next/link";
import { Skeleton } from "@/commons/components/skeleton";

// 리스트 체크박스 공통 컴포넌트
export default function CommonsTodoListsCheckbox({
  uuid,
  checked,
  title,
  id,
  isLoading,
}: ICommonsTodoListsCheckboxProps): ReactNode {
  const titleItemRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { updateTodolistCheckedMutation } = useServerUtillsTodoListsUpdate();

  // 리스트 checked toggle 함수
  const toggleTodolistChecked = (): void => {
    try {
      updateTodolistCheckedMutation.mutate({ id, checked });
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err?.message ?? "");
      }
    }
  };

  useLayoutEffect(() => {
    // ref 값이 없으면, 스타일 추가 없음
    if (!titleItemRef?.current) return;

    // 체크가 되어 있다면 추가 스타일을 위한 클래스 네임 추가
    if (checked) titleItemRef.current.classList.add(styles.checked);
    // 비체크일 경우 기존의 클래스 네임 삭제
    else titleItemRef.current.classList.remove(styles.checked);
  }, [checked]);

  return (
    <div className={styles.checkbox__wrapper} ref={titleItemRef}>
      <Skeleton isLoading={isLoading}>
        <Checkbox
          id={uuid}
          isChecked={checked ?? false}
          onClick={toggleTodolistChecked}
        />
      </Skeleton>

      <Link href={`/todo-list/${id}`}>
        <Skeleton isLoading={isLoading}>
          <TextTitle02 useLineLimit={1}>{title}</TextTitle02>
        </Skeleton>
      </Link>
    </div>
  );
}
