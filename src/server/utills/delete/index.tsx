import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUseServerUtillsDeleteReturn } from "./types";
import { deleteTodolist } from "@/server/apis";
import {
  IFetchTodoInfiniteQueryInfo,
  IFetchTodoInfo,
  ITodoList,
} from "@/commons/types/todo-list";
import { useUtillsError } from "@/commons/utills";
import { IUseServerUtillsCallback } from "@/commons/types/server-callback";

// 삭제에 관련된 api 함수들
export const useServerUtillsDelete = ({
  callback,
}: IUseServerUtillsCallback): IUseServerUtillsDeleteReturn => {
  const queryClient = useQueryClient();
  const { showError } = useUtillsError();

  // 리스트 삭제 mutation
  const deleteTodolistMutation = useMutation({
    mutationKey: ["todo-lists-checked-toggle"],
    mutationFn: (id: string) => deleteTodolist({ id }),
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
                // 해당하는 리스트의 정보는 임시 삭제
                pages[idx1].data[idx2] = null;

                isFind = true;
                return true;
              }
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
      // 에러 발생시 에러 화면 노출
      showError("400");
    },
    onSettled: callback,
  });

  return {
    deleteTodolistMutation,
  };
};
