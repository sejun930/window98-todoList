import type { ISkeletonBaseProps } from "./types";
import styles from "./styles.module.css";

// 스켈레톤 노출 컴포넌트
export const Skeleton = ({
  children,
  loading,
  className,
}: ISkeletonBaseProps): JSX.Element => {
  let classNames = `${styles.common}  skeleton-wrapper`;
  if (className) classNames += ` skeleton-${className}-wrapper`;

  // 로딩중이 아닐 경우에는 children만 노출
  if (!loading) return children;
  return (
    <div className={classNames}>
      <div className={styles.item}>{children}</div>
    </div>
  );
};
