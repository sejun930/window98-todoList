import styles from "./styles.module.css";

import LayoutsDesktop from "./desktop";
import StartBar from "./startbar";
import LayoutsContents from "./contents";

import type { ReactNode } from "react";

interface ILayoutsProps {
  children: ReactNode;
}

// 레이아웃 구분을 위한 레이아웃 공통 컴포넌트
export default function Layouts({ children }: ILayoutsProps): ReactNode {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top__layout}>
        <LayoutsDesktop />
        <LayoutsContents>{children}</LayoutsContents>
      </div>

      <div className={styles.bottom__layout}>
        <StartBar />
      </div>
    </div>
  );
}
