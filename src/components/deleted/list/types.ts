import type { ITodoList } from "@/commons/types/todo-list";
import type { IUseServerUtillsTodoListsFetchDeleteTodoListsProps } from "@/server/utills/todo-lists/fetch/fetchDeleteTodoLists";

export type IDeletedListProps =
  IUseServerUtillsTodoListsFetchDeleteTodoListsProps;

export type IUseDeletedListProps = IDeletedListProps;
export interface IUseDeletedListReturn {
  items: ITodoList[];
  isLoading: boolean;
  hasItems: boolean;
  fetchMore: () => void;
  toggleCheck: (id: string) => () => void;
}
