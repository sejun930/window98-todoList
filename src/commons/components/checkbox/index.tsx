import type { ICheckboxBaseProps } from "./types";
import styles from "./styles.module.css";
import { MutableRefObject, useLayoutEffect, useRef } from "react";

// 체크박스 공통 컴포넌트
export const Checkbox = ({
  id,
  onClick,
  isChecked = false,
}: ICheckboxBaseProps): JSX.Element => {
  const ref = useRef() as MutableRefObject<HTMLInputElement>;

  // 체크 여부 적용
  useLayoutEffect(() => {
    if (!ref?.current) return;

    ref.current.checked = isChecked;
  }, [isChecked]);

  return (
    <div className={styles.checkbox__wrapper}>
      <input type="checkbox" id={id} ref={ref} />
      <label htmlFor={id} onClick={onClick} />
    </div>
  );
};
