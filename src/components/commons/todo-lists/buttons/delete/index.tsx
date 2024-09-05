import Image from "next/image";
import styles from "../styles.module.css";

import { ButtonPrimaryFit } from "@/commons/components/button";
import { TextBody04 } from "@/commons/components/text";
import { useCommonTodoListsButtonDelete } from "./hook";
import { ICommonTodoListsButtonsDeleteProps } from "./types";

// 리스트 삭제 기능 컴포넌트
export default function CommonTodoListsButtonsDelete({
  info,
}: ICommonTodoListsButtonsDeleteProps) {
  const { openDeleteConfirm } = useCommonTodoListsButtonDelete({ info });

  return (
    <div className={styles.wrapper}>
      <ButtonPrimaryFit onClick={openDeleteConfirm(info)}>
        <Image src="/icons/recycle-small.png" alt="삭제" width={0} height={0} />
        <TextBody04>삭제</TextBody04>
      </ButtonPrimaryFit>
    </div>
  );
}
