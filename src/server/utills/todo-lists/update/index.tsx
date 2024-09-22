import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUpdateTodoList } from "@/server/apis/todo-lists";
import { useUtillsError } from "@/commons/utills";

import type { IUseServerUtillsTodoListsUpdateReturn } from "./types";
import type {
  IFetchTodoInfiniteQueryInfo,
  IFetchTodoInfo,
  ITodoList,
} from "@/commons/types/todo-list";
import type { IZodSchemaTodoListsWrite } from "@/commons/zod/todo-list.zod";
import type { IUseServerUtillsCallback } from "@/commons/types/server-callback";

// 수정에 관련된 api 함수들
export const useServerUtillsTodoListsUpdate = (
  props?: IUseServerUtillsCallback,
): IUseServerUtillsTodoListsUpdateReturn => {
  const {
    updateTodolistChecked,
    updateTodolist,
    updateTodolistDeletedAt,
    updateTodoListsNoneDeletedAt,
  } = useUpdateTodoList();
  const callback = props?.callback;

  const queryClient = useQueryClient();
  const { showError } = useUtillsError();

  // 리스트 체크 mutation
  const updateTodolistCheckedMutation = useMutation({
    mutationKey: ["todo-lists-checked-toggle"],
    mutationFn: async ({ id, checked }: { id: string; checked: boolean }) => {
      return await updateTodolistChecked({ id, checked });
    },
    onSuccess: (updateTodo: ITodoList) => {
      // 개별 리스트의 캐시 변경
      void queryClient.invalidateQueries({
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
              return false;
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
    mutationKey: ["todo-lists-update"],
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: IZodSchemaTodoListsWrite;
    }) => {
      return await updateTodolist({ id, data });
    },
    onSuccess: (updateTodo) => {
      // 개별 리스트의 캐시 변경
      void queryClient.invalidateQueries({
        queryKey: ["todo-list", { id: updateTodo.id }],
      });

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
              return false;
            });

            if (isFind) {
              return true;
            }
            return false;
          });

          return { ...oldInfos, pages };
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

  // 리스트 삭제 업데이트 함수
  const updateTodoListDeletedAtMutation = useMutation({
    mutationKey: ["todo-lists-deleted"],
    mutationFn: async ({ id }: { id: string }) => {
      return await updateTodolistDeletedAt({ id });
    },
    onSuccess: (updateTodo) => {
      // 개별 리스트의 캐시 변경
      void queryClient.invalidateQueries({
        queryKey: ["todo-list", { id: updateTodo.id }],
      });

      // 삭제 리스트의 캐시 변경
      queryClient.setQueryData(
        ["deleted-todo-lists"],
        (oldInfos: IFetchTodoInfiniteQueryInfo) => {
          if (!oldInfos) return { pages: [], pageParams: [] };

          // pages 데이터만 별도 추출
          const pages = JSON.parse(JSON.stringify(oldInfos?.pages));
          const datas: ITodoList[] = pages?.[0]?.data ?? [];

          // 맨 앞에 삭제된 리스트 배치
          datas.unshift(updateTodo);
          pages[0].data = [...datas];
          pages[0].items++;

          return { ...oldInfos, pages };
        },
      );

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
                // 해당하는 리스트 임시 제거
                pages[idx1].data[idx2] = null;

                isFind = true;
                return true;
              }
              return false;
            });

            if (isFind) {
              // 임시 삭제된 리스트는 배열에서 제거
              pages[idx1].data = pages[idx1].data.filter((el: ITodoList) => el);
              return true;
            }
            return false;
          });
          pages[0].items--;

          return { ...oldInfos, pages };
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

  // 리스트 삭제 복원 업데이트 함수
  const updateTodoListsNoneDeletedAtMutation = useMutation({
    mutationKey: ["todo-lists-deleted"],
    mutationFn: async ({ ids }: { ids: string[] }) => {
      // 모든 아이디를 순회하여 삭제 복원 API 실행
      return Promise.all(
        ids.map(async (id) => updateTodoListsNoneDeletedAt({ id })),
      );
    },
    onSuccess: (updateTodo) => {
      // 삭제 리스트의 캐시 변경
      queryClient.setQueryData(
        ["deleted-todo-lists"],
        (oldInfos: IFetchTodoInfiniteQueryInfo) => {
          if (!oldInfos) return { pages: [], pageParams: [] };
          // pages 데이터만 별도 추출
          const pages = JSON.parse(JSON.stringify(oldInfos?.pages));
          const datas: ITodoList[] = pages?.[0]?.data ?? [];

          // 새로 업데이트 된 배열을 Set 자료형으로 변환
          const updateTodoSet = new Set(updateTodo.map((el) => el?.id));
          // 기존의 배열에서 중복되는 데이터 제거
          const filterResult = datas.filter(({ id }) => {
            // 개별 리스트의 캐시 변경
            void queryClient.invalidateQueries({
              queryKey: ["todo-list", { id }],
            });

            return !updateTodoSet.has(id);
          });

          pages[0].items -= updateTodo?.length ?? 0;
          if (pages[0].items < 0) pages[0].items = 0;
          pages[0].data = [...filterResult];

          return { ...oldInfos, pages };
        },
      );

      queryClient.setQueryData(
        ["todo-lists"],
        (oldInfos: IFetchTodoInfiniteQueryInfo) => {
          if (!oldInfos) return { pages: [], pageParams: [] };
          // pages 데이터만 별도 추출
          const pages = JSON.parse(JSON.stringify(oldInfos?.pages));

          // 복원된 데이터 재 추가
          pages[0].data = pages[0].data.concat(updateTodo);
          // 복원된 개수만큼 증가
          pages[0].items += updateTodo?.length ?? 0;

          return { ...oldInfos, pages };
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
    updateTodoListDeletedAtMutation,
    updateTodoListsNoneDeletedAtMutation,
  };
};
