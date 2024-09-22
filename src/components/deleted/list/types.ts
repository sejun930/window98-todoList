import type { ITodoList } from "@/commons/types/todo-list";

export interface IUseDeletedListReturn {
  items: ITodoList[];
  isLoading: boolean;
  hasItems: boolean;
  fetchMore: () => void;
  toggleCheck: (id: string) => () => void;
}
