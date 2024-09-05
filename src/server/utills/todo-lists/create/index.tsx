import {
  IFetchTodoInfiniteQueryInfo,
  ITodoList,
} from "@/commons/types/todo-list";
import { createTodolist } from "@/server/apis/todo-lists";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUseServerUtillsTodoListsCreateReturn } from "./types";
import { IZodSchemaTodoListsWrite } from "@/commons/zod/todo-list.zod";
import { useUtillDialogAlert, useUtillsError } from "@/commons/utills";
import { IUseServerUtillsCallback } from "@/commons/types/server-callback";

// 등록에 관련된 api 함수들
export const useServerUtillsTodoListsCreate = ({
  callback,
}: IUseServerUtillsCallback): IUseServerUtillsTodoListsCreateReturn => {
  const queryClient = useQueryClient();

  const { closeDialogAlert } = useUtillDialogAlert();
  const { showError } = useUtillsError();

  // 리스트 등록 함수
  const createTodoListMutation = useMutation({
    mutationKey: ["todo-lists-checked-toggle"],
    mutationFn: (data: IZodSchemaTodoListsWrite) => createTodolist({ data }),
    onSuccess: (newData) => {
      queryClient.setQueryData(
        ["todo-lists"],
        (oldInfos: IFetchTodoInfiniteQueryInfo) => {
          if (!oldInfos) return { pages: [], pageParams: [] };

          // pages 데이터만 별도 추출
          const pages = JSON.parse(JSON.stringify(oldInfos?.pages));
          const datas: ITodoList[] = pages?.[0]?.data ?? [];

          // 맨 앞에 추가된 리스트 배치
          datas.unshift(newData);
          pages[0].data = [...datas];

          return { ...oldInfos, pages };
        },
      );
    },
    onError: () => {
      // 에러 발생시 에러 화면 노출
      showError("400");
    },
    onSettled: () => {
      closeDialogAlert();

      if (callback) callback();
    },
  });

  return {
    createTodoListMutation,
  };
};
