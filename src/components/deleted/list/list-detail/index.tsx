import { memo } from "react";
import styles from "./styles.module.css";

import type { IDeletedListListDetailProps } from "./types";
import CommonsTodoListsCheckbox from "@/components/commons/todo-lists/checkbox";
import { Checkbox } from "@/commons/components/checkbox";
import { useDeletedInfos } from "@/commons/zustand/store";
import { Skeleton } from "@/commons/components/skeleton";
import { TextTitle02 } from "@/commons/components/text";

// 삭제 - 리스트 상세
const DeletedListListDetail = ({
  uuid,
  isLast,
  info,
  isLoading,
  isChecked,
}: IDeletedListListDetailProps) => {
  const { deletedInfos, setDeletedInfos } = useDeletedInfos();
  const { id, title } = info;

  let classNames = styles.list;
  // 마지막 리스트 여부
  if (isLast) classNames += ` ${styles.isLast}`;

  // 각 리스트의 선택 Toggle
  const toggleCheeck = () => {
    if (isLoading) return;

    // 선택된 리스트의 선택 여부 반환
    const isSelected = deletedInfos[id];
    // 현재 선택 리스트의 복사본
    const _deletedInfos = { ...deletedInfos };

    _deletedInfos[id] = !isSelected;

    setDeletedInfos(_deletedInfos);
  };

  return (
    <li className={classNames}>
      <div className={styles.title__wrapper}>
        <Checkbox isChecked={isChecked} id={uuid} onClick={toggleCheeck} />
        <TextTitle02>{title}</TextTitle02>
      </div>
    </li>
  );
};

export default memo(DeletedListListDetail);
