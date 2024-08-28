import { TextBody02 } from "@/commons/components/text";
import {
  IFetchTodoInfiniteQueryInfo,
  IFetchTodoInfo,
  ITodoList,
} from "@/commons/types/todo-list";
import { useUtillDialogAlert } from "@/commons/utills/dialog-alert";
import { deleteTodolist } from "@/server/apis/delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUseTodoListsListDelete } from "./types";

export const useTodoListsListDelete = ({ info }: IUseTodoListsListDelete) => {
  const queryClient = useQueryClient();

  const id = info?.id ?? "";
  const { openDialogAlert, closeDialogAlert } = useUtillDialogAlert();

  // 리스트 삭제 mutation
  const deleteTodolistMutation = useMutation({
    mutationKey: ["todo-lists-checked-toggle"],
    mutationFn: () => deleteTodolist({ id }),
    onSuccess: (updateTodo: ITodoList) => {
      // 변경된 리스트의 캐시 변경
      queryClient.setQueryData(
        ["todo-lists"],
        (oldInfos: IFetchTodoInfiniteQueryInfo) => {
          if (!oldInfos) return { pages: [], pageParams: [] };

          // pages 데이터만 별도 추출
          const pages = JSON.parse(JSON.stringify(oldInfos?.pages));
          pages.some((info: IFetchTodoInfo, idx1: number) => {
            let datas = info?.data;

            let isFind = false;
            datas.some((el, idx2) => {
              if (el.id === updateTodo.id) {
                // 해당하는 리스트의 정보는 임시 삭제
                pages[idx1].data[idx2] = null;

                isFind = true;
                return true;
              }
            });

            if (isFind) {
              // 임시 삭제된 리스트는 배열에서 제거
              pages[idx1].data = pages[idx1].data.filter((el: ITodoList) => el);

              return true;
            }
            return false;
          });
          pages[0].items--;

          return { ...oldInfos, pages };
        },
      );
    },
  });

  // 리스트 삭제 함수
  const deleteTodoListById = () => {
    if (!id) return;

    try {
      // 리스트 삭제
      deleteTodolistMutation.mutate();
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
