import type { ISkeletonBaseProps } from "./types";
import styles from "./styles.module.css";

// 스켈레톤 노출 컴포넌트
export const Skeleton = ({
  children,
  isLoading,
}: ISkeletonBaseProps): JSX.Element => {
  // 로딩중이 아닐 경우에는 children만 노출
  if (!isLoading) return children;

  return (
    <div className={styles.common}>
      <div className={styles.item}>{children}</div>
    </div>
  );
};
