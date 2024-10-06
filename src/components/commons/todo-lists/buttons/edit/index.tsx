import Image from "next/image";
import styles from "../styles.module.css";

import { TextBody04 } from "@/commons/components/text";
import { useCommonTodoListsButtonsEdit } from "./hook";
import WithAction from "@/commons/components/with-action";

import type { ICommonTodoListsButtonsEditProps } from "./types";
import type { IAction } from "@/commons/components/with-action/types";
import type { ReactNode } from "react";

// 리스트 수정용 컴포넌트
export default function CommonTodoListsButtonsEdit({
  info,
  type,
}: ICommonTodoListsButtonsEditProps): ReactNode {
  const { openEditDialog } = useCommonTodoListsButtonsEdit();

  const action: IAction =
    type === "dialog"
      ? openEditDialog(info)
      : { href: `/todo-list/${info.id}/edit` };

  return (
    <div className={styles.wrapper}>
      <WithAction action={action}>
        <Image src="/icons/update-small.png" alt="수정" width={0} height={0} />
        <TextBody04>Edit</TextBody04>
      </WithAction>
    </div>
  );
}
