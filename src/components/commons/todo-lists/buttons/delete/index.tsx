import Image from "next/image";
import styles from "../styles.module.css";

import { Button } from "@/commons/components/button";
import { TextBody04 } from "@/commons/components/text";
import { useCommonTodoListsButtonDelete } from "./hook";

import type { ICommonTodoListsButtonsDeleteProps } from "./types";
import type { ReactNode } from "react";

// 리스트 삭제 기능 컴포넌트
export default function CommonTodoListsButtonsDelete({
  info,
}: ICommonTodoListsButtonsDeleteProps): ReactNode {
  const { openDeleteConfirm } = useCommonTodoListsButtonDelete({ info });

  return (
    <div className={styles.wrapper}>
      <Button onClick={openDeleteConfirm(info)} theme="primary" size="fit">
        <Image src="/icons/recycle-small.png" alt="삭제" width={0} height={0} />
        <TextBody04>삭제</TextBody04>
      </Button>
    </div>
  );
}
