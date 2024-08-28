import { updateTodolistChecked } from "@/server/apis";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { IUseTodoListsListProps } from "./types";
import {
  IFetchTodoInfiniteQueryInfo,
  IFetchTodoInfo,
  ITodoList,
} from "@/commons/types/todo-list";

export const useTodoListsList = ({
  id,
  checked,
  allData,
}: IUseTodoListsListProps) => {
  const queryClient = useQueryClient();

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

  return {
    toggleChecked,
  };
};
