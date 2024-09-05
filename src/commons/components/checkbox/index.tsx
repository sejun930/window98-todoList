import type { ICheckboxBaseProps } from "./types";
import styles from "./styles.module.css";

// 체크박스 공통 컴포넌트
export const Checkbox = ({
  id,
  onClick,
  isChecked = false,
}: ICheckboxBaseProps): JSX.Element => {
  return (
    <div className={styles.checkbox__wrapper}>
      <input type="checkbox" id={id} checked={isChecked} readOnly />
      <label htmlFor={id} onClick={onClick} />
    </div>
  );
};
