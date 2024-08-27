import type { ITextBaseProps, ITextCommonProps } from "./types";
import styles from "./styles.module.css";

// 텍스트 노출용 공통 컴포넌트
export const TextBase = ({
  children,
  cssprop,
  isLoading = false,
}: ITextBaseProps): JSX.Element => {
  return <span className={`${styles.common} ${cssprop}`}>{children}</span>;
};

export const TextBody01 = ({
  // font-size : 18
  ...rest
}: ITextCommonProps): JSX.Element => {
  return <TextBase {...rest} cssprop={styles.body01} />;
};

export const TextBody02 = ({
  // font-size : 16
  ...rest
}: ITextCommonProps): JSX.Element => {
  return <TextBase {...rest} cssprop={styles.body02} />;
};

export const TextBody03 = ({
  // font-size : 14
  ...rest
}: ITextCommonProps): JSX.Element => {
  return <TextBase {...rest} cssprop={styles.body03} />;
};

export const TextBody04 = ({
  // font-size : 12
  ...rest
}: ITextCommonProps): JSX.Element => {
  return <TextBase {...rest} cssprop={styles.body04} />;
};

export const TextCaption01 = ({
  // font-size : 10
  ...rest
}: ITextCommonProps): JSX.Element => {
  return <TextBase {...rest} cssprop={styles.caption01} />;
};
