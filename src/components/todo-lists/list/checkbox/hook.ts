import {
  IFetchTodoInfiniteQueryInfo,
  IFetchTodoInfo,
  ITodoList,
} from "@/commons/types/todo-list";
import { updateTodolistChecked } from "@/server/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUseTodoListsListCheckboxProps } from "./types";

export const useTodoListsListCheckbox = ({
  id,
  checked,
}: IUseTodoListsListCheckboxProps) => {
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
                console.log(idx1, idx2);
                if (pages[idx1].data[idx2]) pages[idx1].data[idx2] = updateTodo;

                isFind = true;
                return true;
              }
            });

            if (isFind) return true;
            return false;
          });
          console.log(`pages : `, pages);

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
