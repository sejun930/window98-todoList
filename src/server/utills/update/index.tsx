import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUseServerUtillsUpdateReturn } from "./types";
import { updateTodolist, updateTodolistChecked } from "@/server/apis";
import {
  IFetchTodoInfiniteQueryInfo,
  IFetchTodoInfo,
  ITodoList,
} from "@/commons/types/todo-list";
import { IZodSchemaTodoListsWrite } from "@/commons/zod/todo-list.zod";
import { useUtillsError } from "@/commons/utills";
import { IUseServerUtillsCallback } from "@/commons/types/server-callback";

// 수정에 관련된 api 함수들
export const useServerUtillsUpdate = ({
  callback,
}: IUseServerUtillsCallback): IUseServerUtillsUpdateReturn => {
  const queryClient = useQueryClient();
  const { showError } = useUtillsError();

  // 리스트 체크 mutation
  const updateTodolistCheckedMutation = useMutation({
    mutationKey: ["todo-lists-checked-toggle"],
    mutationFn: ({ id, checked }: { id: string; checked: boolean }) =>
      updateTodolistChecked({ id, checked }),
    onSuccess: (updateTodo: ITodoList) => {
      // 개별 리스트의 캐시 변경
      queryClient.invalidateQueries({
        queryKey: ["todo-list", { id: updateTodo.id }],
      });

      // 변경된 리스트의 캐시 변경
      queryClient.setQueryData(
        ["todo-lists"],
        (oldInfos: IFetchTodoInfiniteQueryInfo) => {
          if (!oldInfos) return;

          // pages 데이터만 별도 추출
          const pages = JSON.parse(JSON.stringify(oldInfos?.pages));

          pages.some((info: IFetchTodoInfo, idx1: number) => {
            const datas = info?.data;

            let isFind = false;
            datas.some((el, idx2) => {
              if (el.id === updateTodo.id) {
                if (pages[idx1].data[idx2]) pages[idx1].data[idx2] = updateTodo;

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
    onError: () => {
      showError("400");
    },
  });

  // 리스트 수정 함수
  const updateTodoListMutation = useMutation({
    mutationKey: ["todo-lists-checked-toggle"],
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: IZodSchemaTodoListsWrite;
    }) => updateTodolist({ id, data }),
    onSuccess: (updateTodo) => {
      // 개별 리스트의 캐시 변경
      queryClient.invalidateQueries({
        queryKey: ["todo-list", { id: updateTodo.id }],
      });

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
                const datas = info?.data;

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
    onError: () => {
      showError("400");
    },
    onSettled: () => {
      if (callback) callback();
    },
  });

  return {
    updateTodolistCheckedMutation,
    updateTodoListMutation,
  };
};
