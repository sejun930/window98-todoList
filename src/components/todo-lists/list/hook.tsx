import { updateTodolistChecked } from "@/server/apis";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { IUseTodoListsListProps } from "./types";
import {
  IFetchTodoInfiniteQueryInfo,
  IFetchTodoInfo,
  ITodoList,
} from "@/commons/types/todo-list";
import { useUtillDialogAlert } from "@/commons/utills/dialog-alert";
import { TextBody02 } from "@/commons/components/text";

export const useTodoListsList = ({ id, checked }: IUseTodoListsListProps) => {
  const queryClient = useQueryClient();
  const { openDialogAlert } = useUtillDialogAlert();

  // checked toggle 전용 mutation 함수
  const updateTodolistCheckedMutation = useMutation({
    mutationKey: ["todo-lists-checked-toggle"],
    mutationFn: () => updateTodolistChecked({ id, checked }),
    onSuccess: (updateTodo: ITodoList) => {
      // 변경된 리스트의 캐시 변경
      queryClient.setQueryData(
        ["todo-lists"],
        (oldInfos: IFetchTodoInfiniteQueryInfo) => {
          if (!oldInfos) return { pages: [], pageParams: [] };

          // pages 데이터만 별도 추출
          const pages = JSON.parse(JSON.stringify(oldInfos?.pages));

          pages.some((info: IFetchTodoInfo, idx1: number) => {
            const datas = info?.data;

            let isFind = false;
            datas.some((el, idx2) => {
              if (el.id === updateTodo.id) {
                pages[idx1].data[idx2] = updateTodo;

                isFind = true;
                return true;
              }
            });

            if (isFind) return true;
            return false;
          });

          return { ...oldInfos, pages };
        },
      );
    },
  });

  // Todo-list checked toggle 함수
  const toggleChecked = () => {
    try {
      updateTodolistCheckedMutation.mutate();
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err?.message ?? "");
      }
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
        okEvent: () => {},
      },
    });
  };

  return {
    toggleChecked,
    openDeleteConfirm,
  };
};
