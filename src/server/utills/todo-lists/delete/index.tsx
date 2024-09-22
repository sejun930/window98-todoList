import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUtillsDialogAlert, useUtillsError } from "@/commons/utills";
import { useDeleteTodolist } from "@/server/apis/todo-lists/delete";

import type { IUseServerUtillsTodoListsDeleteReturn } from "./types";
import type { IUseServerUtillsCallback } from "@/commons/types/server-callback";
import type {
  IFetchTodoInfiniteQueryInfo,
  ITodoList,
} from "@/commons/types/todo-list";

// 삭제에 관련된 api 함수들
export const useServerUtillsTodoListsDelete = (
  props?: IUseServerUtillsCallback,
): IUseServerUtillsTodoListsDeleteReturn => {
  const callback = props?.callback;

  const queryClient = useQueryClient();
  const { deleteTodolist } = useDeleteTodolist();

  const { closeDialogAlert } = useUtillsDialogAlert();
  const { showError } = useUtillsError();

  // 리스트 삭제 함수
  const deleteTodoListsMutation = useMutation({
    mutationKey: ["todo-lists-checked-toggle"],
    mutationFn: async ({ ids }: { ids: string[] }) => {
      // 모든 아이디를 순회하여 삭제 API 실행
      return await Promise.all(
        ids.map(async (id) => await deleteTodolist({ id })),
      );
    },
    onSuccess: (deleteDatas) => {
      // 삭제 리스트의 캐시 변경
      queryClient.setQueryData(
        ["deleted-todo-lists"],
        (oldInfos: IFetchTodoInfiniteQueryInfo) => {
          if (!oldInfos) return { pages: [], pageParams: [] };
          // pages 데이터만 별도 추출
          const pages = JSON.parse(JSON.stringify(oldInfos?.pages));
          const datas: ITodoList[] = pages?.[0]?.data ?? [];

          // 삭제 된 배열을 Set 자료형으로 변환
          const deleteTodoSet = new Set(deleteDatas.map((el) => el?.id));
          // 기존의 배열에서 삭제 데이터 제거
          const filterResult = datas.filter(({ id }) => {
            // 개별 리스트의 캐시 변경
            void queryClient.invalidateQueries({
              queryKey: ["todo-list", { id }],
            });

            return !deleteTodoSet.has(id);
          });

          pages[0].items -= deleteDatas?.length ?? 0;
          if (pages[0].items < 0) pages[0].items = 0;
          pages[0].data = [...filterResult];

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
    deleteTodoListsMutation,
  };
};
