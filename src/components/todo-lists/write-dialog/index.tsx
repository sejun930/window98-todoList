import Dialog from "@/commons/components/dialog";
import WithForm from "@/commons/hocs/form";
import TodolistsWrite from "./write";
import { zodSchemaTodoListsWrite } from "./form";

// 리스트 등록 & 수정을 위한 모달 오픈 컴포넌트
export default function TodoListWriteDialog({ toggleDialog, openDialog }: any) {
  return (
    <Dialog
      header={{
        title: "리스트 등록",
        action: toggleDialog(false),
      }}
      isOpen={openDialog}
    >
      <WithForm zodSchema={zodSchemaTodoListsWrite}>
        <TodolistsWrite />
      </WithForm>
    </Dialog>
  );
}
