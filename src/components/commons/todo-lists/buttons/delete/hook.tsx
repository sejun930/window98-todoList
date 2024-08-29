import type {
  IUseCommonTodoListsButtonsDeleteProps,
  IUseCommonTodoListsButtonsDeleteReturn,
} from "./types";

import { TextBody02 } from "@/commons/components/text";
import { ITodoList } from "@/commons/types/todo-list";
import { useUtillDialogAlert } from "@/commons/utills/dialog-alert";
import { useServerUtillsDelete } from "@/server/utills/delete";
import { useRouter } from "next/navigation";

export const useCommonTodoListsButtonDelete = ({
  info,
}: IUseCommonTodoListsButtonsDeleteProps): IUseCommonTodoListsButtonsDeleteReturn => {
  const { id } = info;
  const { openDialogAlert, closeDialogAlert } = useUtillDialogAlert();
  const { deleteTodolistMutation } = useServerUtillsDelete();

  const router = useRouter();

  // 리스트 삭제 함수
  const deleteTodoListById = () => {
    if (!id) return;

    try {
      // 리스트 삭제
      deleteTodolistMutation.mutate(id);
      // dialog-alert 종료
      closeDialogAlert();

      // 홈으로 이동
      router.replace("/todo-list");
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
