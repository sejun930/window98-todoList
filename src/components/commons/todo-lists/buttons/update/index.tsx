import Image from "next/image";
import styles from "../styles.module.css";

import { TextBody04 } from "@/commons/components/text";
import { useCommonTodoListsButtonsUpdate } from "./hook";
import WithAction from "@/commons/components/with-action";

import type { ICommonTodoListsButtonsUpdateProps } from "./types";
import type { IAction } from "@/commons/components/with-action/types";
import type { ReactNode } from "react";

// 리스트 수정용 컴포넌트
export default function CommonTodoListsButtonsUpdate({
  info,
  type,
}: ICommonTodoListsButtonsUpdateProps): ReactNode {
  const { openUpdateDialog } = useCommonTodoListsButtonsUpdate();

  const action: IAction =
    type === "dialog"
      ? openUpdateDialog(info)
      : { href: `/todo-list/${info.id}/edit` };

  return (
    <div className={styles.wrapper}>
      <WithAction action={action}>
        <Image src="/icons/update-small.png" alt="수정" width={0} height={0} />
        <TextBody04>Update</TextBody04>
      </WithAction>
    </div>
  );
}
