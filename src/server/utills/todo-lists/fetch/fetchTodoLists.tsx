import type { IFetchTodoInfo } from "@/commons/types/todo-list";
import { useFetchTodoList } from "@/server/apis/todo-lists";
import {
  type InfiniteQueryObserverResult,
  type InfiniteData,
  useInfiniteQuery,
} from "@tanstack/react-query";

// 리스트 조회
export const useServerUtillsTodoListsFetchTodoLists =
  (): IUseServerUtillsTodoListsFetchTodoListsReturn => {
    const { fetchAllTodoLists } = useFetchTodoList();

    // 리스트 조회용 함수
    const fetchInfiniteTodoList = async (
      _page: number,
    ): Promise<IFetchTodoInfo> => {
      const result = await fetchAllTodoLists({ _page });
      return result;
    };

    const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
      queryKey: ["todo-lists"],
      queryFn: async ({ pageParam }) => {
        return await fetchInfiniteTodoList(pageParam);
      },
      getNextPageParam: (lastPage, allPages) => {
        // 마지막 페이지인지 검증
        const isLast = !lastPage?.next ?? false;
        if (isLast) return undefined;

        return allPages?.length + 1;
      },
      initialPageParam: 1,
    });

    return {
      data,
      isLoading,
      hasNextPage,
      fetchNextPage,
    };
  };

interface IUseServerUtillsTodoListsFetchTodoListsReturn {
  data?: InfiniteData<IFetchTodoInfo, unknown>;
  isLoading: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => Promise<
    InfiniteQueryObserverResult<InfiniteData<IFetchTodoInfo, unknown>>
  >;
}
