import styles from "./styles.module.css";
import { MutableRefObject, useLayoutEffect, useRef } from "react";
import { Checkbox } from "@/commons/components/checkbox";
import { TextTitle02 } from "@/commons/components/text";
import { ITodoListsListCheckboxProps } from "./types";
import { useTodoListsListCheckbox } from "./hook";

// Todo-list 체크 여부 컴포넌트
export default function TodoListsListCheckbox({
  uuid,
  checked,
  title,
  id,
}: ITodoListsListCheckboxProps) {
  const titleItemRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { toggleChecked } = useTodoListsListCheckbox({ checked, id });

  useLayoutEffect(() => {
    if (!titleItemRef?.current) return;

    // 체크가 되어 있다면 추가 스타일을 위한 클래스 네임 추가
    if (checked) titleItemRef.current.classList.add(styles.checked);
    // 비체크일 경우 기존의 클래스 네임 삭제
    else titleItemRef.current.classList.remove(styles.checked);
  }, [checked]);

  return (
    <div className={styles.checkbox__wrapper} ref={titleItemRef}>
      <Checkbox
        id={uuid}
        isChecked={checked ?? false}
        onClick={toggleChecked}
      />
      <TextTitle02 useLineLimit={1}>{title}</TextTitle02>
    </div>
  );
}
