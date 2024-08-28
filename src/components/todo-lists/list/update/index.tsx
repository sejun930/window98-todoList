import { ButtonPrimary } from "@/commons/components/button";
import { TextBody04 } from "@/commons/components/text";
import Image from "next/image";
import { ITodoListsListUpdateProps } from "./types";
import { useTodoListsListUpdate } from "./hook";

// 리스트 수정용 컴포넌트
export default function TodoListsListUpdate({
  info,
}: ITodoListsListUpdateProps) {
  const { openUpdateDialog } = useTodoListsListUpdate();

  return (
    <ButtonPrimary onClick={openUpdateDialog}>
      <Image src="/icons/update-small.png" alt="수정" width={0} height={0} />
      <TextBody04>수정</TextBody04>
    </ButtonPrimary>
  );
}
