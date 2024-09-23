import type { IButtonBaseProps } from "./types";
import styles from "./styles.module.css";
import { forwardRef } from "react";

// 버튼 공통 컴포넌트
export const Button = forwardRef<HTMLButtonElement, IButtonBaseProps>(
  ({ children, theme, size, onClick, disable, active }, ref): JSX.Element => {
    let classNames = `${styles.common} ${styles[theme]} ${styles[size]}`;
    if (disable) classNames += ` ${styles.disable}`;
    else if (active) classNames += ` ${styles.active}`;

    const onClickButton = (): void => {
      if (onClick) void onClick();
    };

    return (
      <button
        type="button"
        className={classNames}
        onClick={onClickButton}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);
