import type { ITodoList } from "@/commons/types/todo-list";

export interface IUseDeleteTodolistReturn {
  deleteTodolist: (props: IDeleteTodolistProps) => Promise<ITodoList>;
}

export interface IDeleteTodolistProps {
  id: string;
}
export type IDeleteTodolistReturn = ITodoList;
