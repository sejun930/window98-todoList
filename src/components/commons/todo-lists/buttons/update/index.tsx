import Image from "next/image";
import styles from "../styles.module.css";

import { TextBody04 } from "@/commons/components/text";
import { ICommonTodoListsButtonsUpdateProps } from "./types";
import { useCommonTodoListsButtonsUpdate } from "./hook";
import { IAction } from "@/commons/components/with-action/types";
import WithAction from "@/commons/components/with-action";

// 리스트 수정용 컴포넌트
export default function CommonTodoListsButtonsUpdate({
  info,
  type,
}: ICommonTodoListsButtonsUpdateProps) {
  const { openUpdateDialog } = useCommonTodoListsButtonsUpdate();

  const action: IAction =
    type === "dialog"
      ? openUpdateDialog(info)
      : { href: `/todo-list/${info.id}/edit` };

  return (
    <div className={styles.wrapper}>
      <WithAction action={action}>
        <Image src="/icons/update-small.png" alt="수정" width={0} height={0} />
        <TextBody04>수정</TextBody04>
      </WithAction>
    </div>
  );
}
