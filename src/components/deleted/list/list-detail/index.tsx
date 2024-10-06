import { memo, type ReactNode } from "react";
import styles from "./styles.module.css";

import type { IDeletedListListDetailProps } from "./types";
import { Checkbox } from "@/commons/components/checkbox";
import { TextBody03, TextBody04, TextTitle02 } from "@/commons/components/text";
import { useUtillsDate } from "@/commons/utills";

// 삭제 - 리스트 상세
const DeletedListListDetail = ({
  uuid,
  isLast,
  info,
  isChecked,
  toggleCheck,
}: IDeletedListListDetailProps): ReactNode => {
  const { title, deletedAtTime, contents } = info;
  const { getTimeString } = useUtillsDate();

  let classNames = styles.list;
  // 마지막 리스트 여부
  if (isLast) classNames += ` ${styles.isLast}`;

  // 삭제 시간 조회
  const deletedAt = getTimeString(deletedAtTime);

  return (
    <li className={classNames}>
      <div className={styles.header}>
        <div className={styles.title__wrapper}>
          <Checkbox isChecked={isChecked} id={uuid} onClick={toggleCheck} />
          <TextTitle02>{title}</TextTitle02>
        </div>
        <div className={styles.date__wrapper}>
          <TextBody04>{deletedAt}</TextBody04>
        </div>
      </div>
      <div className={styles.contents}>
        <TextBody03>{contents}</TextBody03>
      </div>
    </li>
  );
};

export default memo(DeletedListListDetail);
