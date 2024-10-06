import { useUtillsDialog } from "@/commons/utills/dialog";

import WithForm from "@/commons/hocs/form";
import { useUtillsDialogAlert } from "@/commons/utills/dialog-alert";

import CommonsTodoListsWrite from "../../write";
import { zodSchemaTodoListsWrite } from "@/commons/zod/todo-list.zod";
import { useUtillsCheck } from "@/commons/utills/check";

import type { ITodoList } from "@/commons/types/todo-list";
import type { IuseCommonTodoListsButtonsUpdateReturn } from "./types";

export const useCommonTodoListsButtonsUpdate =
  (): IuseCommonTodoListsButtonsUpdateReturn => {
    const { openDialog, closeDialog } = useUtillsDialog();
    const { openDialogAlert, closeDialogAlert } = useUtillsDialogAlert();
    const { getIsDifferenceDatas } = useUtillsCheck();

    // 수정용 dialog 창 띄우기
    const openUpdateDialog = (info: ITodoList) => () => {
      // 이탈시, 데이터 변경 감지
      const onCloseWithConfirm = (): void => {
        // 수정된 내역이 있는지 조회
        const isDifference = getIsDifferenceDatas({
          targetIds: ["title", "contents"],
          origin: { title: info.title, contents: info.contents },
        });

        // 변경된 부분이 없다면 종료
        if (!isDifference) {
          closeDialog();
          return;
        }

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
        headerInfo: { title: "List Update", action: onCloseWithConfirm },
        children: (
          <WithForm zodSchema={zodSchemaTodoListsWrite}>
            <CommonsTodoListsWrite isEdit info={info} />
          </WithForm>
        ),
      });
    };

    return {
      openUpdateDialog,
    };
  };
