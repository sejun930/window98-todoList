import type { ITodoList } from "@/commons/types/todo-list";

export interface IDeletedListReturn {
  items: ITodoList[];
  isLoading: boolean;
  allData: number;
}
