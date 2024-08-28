import { ButtonPrimary } from "@/commons/components/button";
import { TextBody04 } from "@/commons/components/text";
import Image from "next/image";
import { useTodoListsListDelete } from "./hook";
import { ITodoListsListDeleteProps } from "./types";

// 리스트 삭제 기능 컴포넌트
export default function TodoListsListDelete({
  info,
}: ITodoListsListDeleteProps) {
  const { openDeleteConfirm } = useTodoListsListDelete({ info });

  return (
    <ButtonPrimary onClick={openDeleteConfirm(info)}>
      <Image src="/icons/recycle-small.png" alt="삭제" width={0} height={0} />
      <TextBody04>삭제</TextBody04>
    </ButtonPrimary>
  );
}
