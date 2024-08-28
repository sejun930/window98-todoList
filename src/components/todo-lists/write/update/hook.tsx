import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  IUseTodolistsWriteUpdateProps,
  IUseTodolistsWriteUpdateReturn,
} from "./types";
import { IZodSchemaTodoListsWrite } from "../types";
import { updateTodolist } from "@/server/apis";
import {
  IFetchTodoInfiniteQueryInfo,
  IFetchTodoInfo,
  ITodoList,
} from "@/commons/types/todo-list";

// 수정 관련 hook
export const useTodolistsWriteUpdate = ({
  info,
}: IUseTodolistsWriteUpdateProps): IUseTodolistsWriteUpdateReturn => {
  const { id } = info;
  const queryClient = useQueryClient();

  // 수정 함수
  const updateTodoListMutation = useMutation({
    mutationKey: ["todo-lists-checked-toggle"],
    mutationFn: (data: IZodSchemaTodoListsWrite) =>
      updateTodolist({ id, data }),
    onSuccess: (updateTodo) => {
      queryClient.setQueryData(
        ["todo-lists"],
        (oldInfos: IFetchTodoInfiniteQueryInfo) => {
          if (!oldInfos) return { pages: [], pageParams: [] };

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
                    // 해당하는 리스트의 정보 변경
                    pages[idx1].data[idx2] = updateTodo;

                    isFind = true;
                    return true;
                  }
                });

                if (isFind) {
                  return true;
                }
                return false;
              });
              pages[0].items--;

              return { ...oldInfos, pages };
            },
          );
        },
      );
    },
  });

  return {
    updateTodoListMutation,
  };
};
