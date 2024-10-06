import { TextBody02 } from "@/commons/components/text";
import { useUtillsDialogAlert } from "@/commons/utills/dialog-alert";
import { useServerUtillsTodoListsUpdate } from "@/server/utills/todo-lists";
import { useRouter } from "next/navigation";
import { URL } from "@/commons/constants/URL";

import type { ITodoList } from "@/commons/types/todo-list";
import type {
  IUseCommonTodoListsButtonsDeleteProps,
  IUseCommonTodoListsButtonsDeleteReturn,
} from "./types";

export const useCommonTodoListsButtonDelete = ({
  info,
}: IUseCommonTodoListsButtonsDeleteProps): IUseCommonTodoListsButtonsDeleteReturn => {
  const { id } = info;
  const { openDialogAlert, closeDialogAlert } = useUtillsDialogAlert();
  const router = useRouter();

  // 삭제 후 실행 callback
  const deleteCallback = (): void => {
    // 홈으로 이동
    router.replace(URL().TODOLIST);
    // dialog-alert 종료
    closeDialogAlert();
  };

  // 수정 Mutation
  const { updateTodoListDeletedAtMutation } = useServerUtillsTodoListsUpdate({
    callback: deleteCallback,
  });

  // 리스트 삭제 함수
  const deleteTodoListById = (): void => {
    if (!id) return;

    try {
      openDialogAlert({
        onlyWait: true,
        dialogAlertInfo: {
          text: `리스트 삭제 중입니다.`,
        },
        headerInfo: {
          title: "리스트 삭제 중",
        },
      });

      // 리스트 삭제 = 삭제일 업데이트
      updateTodoListDeletedAtMutation.mutate({ id });
    } catch (err) {
      if (err instanceof Error) throw new Error(err.message);
    }
  };

  // 삭제 확인용 dialog 오픈
  const openDeleteConfirm = (info: ITodoList) => () => {
    openDialogAlert({
      headerInfo: { title: "Confirm List Delete" },
      dialogAlertInfo: {
        text: (
          <TextBody02>
            <b>{String(info.title)}</b>를 삭제하시겠습니까?
          </TextBody02>
        ),
        okEvent: deleteTodoListById,
      },
    });
  };

  return {
    openDeleteConfirm,
  };
};
