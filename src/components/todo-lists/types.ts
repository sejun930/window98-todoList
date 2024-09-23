import type { ITodoList } from "@/commons/types/todo-list";
import type { IUseServerUtillsTodoListsFetchTodoListsProps } from "@/server/utills/todo-lists/fetch/fetchTodoLists";

export type ITodoListsListProps = IUseServerUtillsTodoListsFetchTodoListsProps;
export type IUseTodoListsListProps = ITodoListsListProps;

export interface IUseTodoListsListReturn {
  items: ITodoList[];
  fetchMore: () => void;
  hasNextPage: boolean;
  openWriteDialog: () => void;
  isLoading: boolean;
  allData: number;
  hasItems: boolean;
}
