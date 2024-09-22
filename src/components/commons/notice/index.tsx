import { INoticeProps } from "./types";
import styles from "./styles.module.css";

import type { ReactNode } from "react";
import { TextTitle01 } from "@/commons/components/text";

// 빈 리스트 및 로딩 여부를 노출하는 UI 컴포넌트
export default function Notice({ isShow, text }: INoticeProps): ReactNode {
  if (!isShow) return <></>;

  return (
    <li className={styles.empty}>
      <TextTitle01>{text ?? ""}</TextTitle01>
    </li>
  );
}
