import { useUtillDialog } from "@/commons/utills/dialog";
import { IuseTodoListsListUpdateReturn } from "./types";
import TodolistsWrite from "../../write";
import { zodSchemaTodoListsWrite } from "../../write/types";
import WithForm from "@/commons/hocs/form";
import { ITodoList } from "@/commons/types/todo-list";
import { useUtillDialogAlert } from "@/commons/utills/dialog-alert";

export const useTodoListsListUpdate = (): IuseTodoListsListUpdateReturn => {
  const { openDialog, closeDialog } = useUtillDialog();
  const { openDialogAlert, closeDialogAlert } = useUtillDialogAlert();

  // 수정용 dialog 창 띄우기
  const openUpdateDialog = (info: ITodoList) => () => {
    // 이탈시, 데이터 변경 감지
    const onCloseWithConfirm = () => {
      // 실시간 제목 조회
      const title =
        (document.getElementById("write-title") as HTMLInputElement)?.value ??
        "";
      // 실시간 내용 조회
      const contents =
        (document.getElementById("write-contents") as HTMLTextAreaElement)
          ?.value ?? "";

      // 제목 및 내용 중 기존의 내용과 변경된 내용이 있는지 체크
      const isChanged = title !== info.title || contents !== info.contents;
      // 변경된 부분이 없다면 종료
      if (!isChanged) return closeDialog();

      // 변경된 부분이 있다면 종료에 대한 재검증
      // 재검증을 위한 dialog-alert 실행
      openDialogAlert({
        headerInfo: { title: "수정창 종료" },
        dialogAlertInfo: {
          text: "변경된 내용이 있습니다. 저장하지 않고 종료하시겠습니까?",
          okEvent: () => {
            // dialog, dialog-alert 모두 종료
            closeDialogAlert();
            closeDialog();
          },
        },
      });
    };

    openDialog({
      headerInfo: { title: "리스트 수정", action: onCloseWithConfirm },
      children: (
        <WithForm zodSchema={zodSchemaTodoListsWrite}>
          <TodolistsWrite isEdit info={info} />
        </WithForm>
      ),
    });
  };

  return {
    openUpdateDialog,
  };
};
