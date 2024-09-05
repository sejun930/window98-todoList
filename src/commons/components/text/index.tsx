import type { ITextBaseProps, ITextCommonProps } from "./types";
import styles from "./styles.module.css";

// 텍스트 노출용 공통 컴포넌트
export const TextBase = ({
  children,
  cssprop,
  useLineLimit,
}: ITextBaseProps): JSX.Element => {
  let classNames = `${styles.common} ${cssprop}`;
  // 글자수 제한을 사용할 경우
  if (useLineLimit) classNames += ` ${styles.line__limit}`;

  return (
    <span
      className={classNames}
      title={typeof children === "string" ? children : ""}
    >
      {children}
    </span>
  );
};

export const TextTitle01 = ({
  // font-size : 24
  ...rest
}: ITextCommonProps): JSX.Element => {
  return <TextBase {...rest} cssprop={styles.title01} />;
};
export const TextTitle02 = ({
  // font-size : 20
  ...rest
}: ITextCommonProps): JSX.Element => {
  return <TextBase {...rest} cssprop={styles.title02} />;
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
