import type { IButtonBaseProps, IButtonCommonProps } from "./types";
import styles from "./styles.module.css";

// 버튼 공통 컴포넌트
export const ButtonBase = ({
  children,
  theme,
  size,
  onClick,
  disable,
  // isLoading = false,
}: IButtonBaseProps): JSX.Element => {
  let classNames = `${styles.common} ${styles[theme]} ${styles[size]}`;
  if (disable) classNames += ` ${styles.disable}`;

  return (
    <button type="button" className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};

// primary 테마 - fit 사이즈
export const ButtonPrimary = ({ ...rest }: IButtonCommonProps): JSX.Element => {
  return <ButtonBase {...rest} theme="primary" size="fit" />;
};

// primary 테마 - s 사이즈
export const ButtonPrimaryS = ({
  ...rest
}: IButtonCommonProps): JSX.Element => {
  return <ButtonBase {...rest} theme="primary" size="s" />;
};
// primary 테마 - m 사이즈
export const ButtonPrimaryM = ({
  ...rest
}: IButtonCommonProps): JSX.Element => {
  return <ButtonBase {...rest} theme="primary" size="m" />;
};
// primary 테마 - l 사이즈
export const ButtonPrimaryL = ({
  ...rest
}: IButtonCommonProps): JSX.Element => {
  return <ButtonBase {...rest} theme="primary" size="l" />;
};
