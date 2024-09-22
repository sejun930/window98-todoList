import { memo } from "react";
import styles from "./styles.module.css";

import type { IDeletedListListDetailProps } from "./types";
import CommonsTodoListsCheckbox from "@/components/commons/todo-lists/checkbox";
import { Checkbox } from "@/commons/components/checkbox";
import { useDeletedInfos } from "@/commons/zustand/store";
import { Skeleton } from "@/commons/components/skeleton";
import { TextBody04, TextTitle02 } from "@/commons/components/text";
import { useUtillsDate } from "@/commons/utills";

// 삭제 - 리스트 상세
const DeletedListListDetail = ({
  uuid,
  isLast,
  info,
  isLoading,
  isChecked,
  toggleCheck,
}: IDeletedListListDetailProps) => {
  const { title, deletedAtTime } = info;
  const { getTimeString } = useUtillsDate();

  let classNames = styles.list;
  // 마지막 리스트 여부
  if (isLast) classNames += ` ${styles.isLast}`;

  // 삭제 시간 조회
  const deletedAt = getTimeString(deletedAtTime);

  return (
    <li className={classNames}>
      <div className={styles.title__wrapper}>
        <Checkbox isChecked={isChecked} id={uuid} onClick={toggleCheck} />
        <TextTitle02>{title}</TextTitle02>
      </div>
      <div className={styles.date__wrapper}>
        <TextBody04>{deletedAt} (삭제)</TextBody04>
      </div>
    </li>
  );
};

export default memo(DeletedListListDetail);
