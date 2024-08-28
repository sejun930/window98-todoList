import { updateTodolistChecked } from "@/server/apis";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { IUseTodoListsListProps } from "./types";
import { IFetchTodoInfo, ITodoList } from "@/commons/types/todo-list";

export const useTodoListsList = ({ id, checked }: IUseTodoListsListProps) => {
  const queryClient = useQueryClient();

  // checked toggle 전용 mutation 함수
  const updateTodolistCheckedMutation = useMutation({
    mutationKey: ["todo-lists-checked-toggle"],
    mutationFn: () => updateTodolistChecked({ id, checked }),
    onSuccess: (updateTodo: ITodoList) => {
      // 변경된 리스트의 캐시 변경
      queryClient.setQueryData(["todo-lists"], (oldInfos: IFetchTodoInfo) => {
        if (!oldInfos) return [];

        const oldTodos = oldInfos?.data ?? [];
        // 변경된 리스트의 캐시만 수정
        const newTodos = oldTodos.map((el) => {
          return el.id === updateTodo.id ? updateTodo : el;
        });
        return { ...oldInfos, data: newTodos };
      });
    },
  });

  // Todo-list checked toggle 함수
  const toggleChecked = () => {
    try {
      updateTodolistCheckedMutation.mutate();
      //   console.log(`result : `, result);
      // console.log(updateTodolistCheckedMutation);
      // const result = await updateTodolistChecked({ id, checked });
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
