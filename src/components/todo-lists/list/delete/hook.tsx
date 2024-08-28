import type {
  IUseTodoListsListDeleteProps,
  IUseTodoListsListDeleteReturn,
} from "./types";

import { TextBody02 } from "@/commons/components/text";
import { ITodoList } from "@/commons/types/todo-list";
import { useUtillDialogAlert } from "@/commons/utills/dialog-alert";
import { useServerUtillsDelete } from "@/server/utills/delete";

export const useTodoListsListDelete = ({
  info,
}: IUseTodoListsListDeleteProps): IUseTodoListsListDeleteReturn => {
  const { id } = info;
  const { openDialogAlert, closeDialogAlert } = useUtillDialogAlert();
  const { deleteTodolistMutation } = useServerUtillsDelete();

  // 리스트 삭제 함수
  const deleteTodoListById = () => {
    if (!id) return;

    try {
      // 리스트 삭제
      deleteTodolistMutation.mutate(id);
      // dialog-alert 종료
      closeDialogAlert();
    } catch (err) {
      if (err instanceof Error) throw new Error(err.message);
    }
  };

  // 삭제 확인용 dialog 오픈
  const openDeleteConfirm = (info: ITodoList) => () => {
    openDialogAlert({
      headerInfo: { title: "리스트 삭제" },
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
