import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IZodSchemaTodoListsWrite } from "../types";
import { createTodolist } from "@/server/apis";
import {
  IFetchTodoInfiniteQueryInfo,
  ITodoList,
} from "@/commons/types/todo-list";
import { ITodolistsWriteCreateReturn } from "./types";

// 등록 관련 hook
export const useTodolistsWriteCreate = (): ITodolistsWriteCreateReturn => {
  const queryClient = useQueryClient();

  // 등록 함수
  const createTodoListMutation = useMutation({
    mutationKey: ["todo-lists-checked-toggle"],
    mutationFn: (data: IZodSchemaTodoListsWrite) => createTodolist({ data }),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["todo-lists"],
        (oldInfos: IFetchTodoInfiniteQueryInfo) => {
          if (!oldInfos) return { pages: [], pageParams: [] };

          // pages 데이터만 별도 추출
          const pages = JSON.parse(JSON.stringify(oldInfos?.pages));
          const datas: ITodoList[] = pages?.[0]?.data ?? [];

          // 맨 앞에 추가된 리스트 배치
          datas.unshift(data);
          pages[0].data = [...datas];

          return { ...oldInfos, pages };
        },
      );
    },
  });

  return {
    createTodoListMutation,
  };
};
