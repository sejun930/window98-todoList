import { updateTodolistChecked } from "@/server/apis";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { IUseTodoListsListProps } from "./types";
import {
  IFetchTodoInfiniteQueryInfo,
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

          // 변경된 내용의 인덱스 값 추출
          const idx = Math.abs(Number(updateTodo.id) - allData);
          // 변경된 내용이 어떤 페이지에 있는지 조회
          const pagesIdx = Math.floor(idx / 10);

          if (pages?.[pagesIdx]?.data?.[idx] && updateTodo)
            pages[pagesIdx].data[idx] = updateTodo;

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
