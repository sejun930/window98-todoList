import type { IFetchTodoInfo } from "@/commons/types/todo-list";
import { useFetchTodoList } from "@/server/apis/todo-lists";
import {
  type InfiniteQueryObserverResult,
  type InfiniteData,
  useInfiniteQuery,
} from "@tanstack/react-query";

// 삭제된 리스트 목록 조회
export const useServerUtillsTodoListsFetchDeleteTodoLists = (
  props?: IUseServerUtillsTodoListsFetchDeleteTodoListsProps,
): IUseServerUtillsTodoListsFetchDeleteTodoListsReturn => {
  const { fetchDeletedTodoList } = useFetchTodoList();
  const initialPageParam = props?.initialPageParam ?? 1;

  // 삭제 리스트 조회용 함수
  const fetchInfiniteTodoList = async (
    _page: number,
  ): Promise<IFetchTodoInfo> => {
    const result = await fetchDeletedTodoList({ _page });
    return result;
  };

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["deleted-todo-lists"],
    queryFn: async ({ pageParam }) => {
      return await fetchInfiniteTodoList(pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지인지 검증
      const isLast = !lastPage?.next ?? false;
      if (isLast) return undefined;

      return allPages?.length + 1;
    },
    initialPageParam,
  });

  return {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
  };
};

export interface IUseServerUtillsTodoListsFetchDeleteTodoListsProps {
  initialPageParam?: number;
}

interface IUseServerUtillsTodoListsFetchDeleteTodoListsReturn {
  data?: InfiniteData<IFetchTodoInfo, unknown>;
  isLoading: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => Promise<
    InfiniteQueryObserverResult<InfiniteData<IFetchTodoInfo, unknown>>
  >;
}
