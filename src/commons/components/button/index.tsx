import type { IButtonBaseProps } from "./types";
import styles from "./styles.module.css";

// 버튼 공통 컴포넌트
export const ButtonBase = ({
  children,
  theme,
  size,
  onClick,
  disable,
  active,
}: IButtonBaseProps): JSX.Element => {
  let classNames = `${styles.common} ${styles[theme]} ${styles[size]}`;
  if (disable) classNames += ` ${styles.disable}`;
  else if (active) classNames += ` ${styles.active}`;

  return (
    <button type="button" className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};

export {
  ButtonPrimaryFit,
  ButtonPrimaryL,
  ButtonPrimaryM,
  ButtonPrimaryS,
} from "./button-primary";
export {
  ButtonDangerousFit,
  ButtonDangerousL,
  ButtonDangerousM,
  ButtonDangerousS,
} from "./button-dangerous";
