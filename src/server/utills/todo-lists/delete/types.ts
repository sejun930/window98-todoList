import { ITodoList } from "@/commons/types/todo-list";
import { UseMutationResult } from "@tanstack/react-query";

export interface IUseServerUtillsDeleteTodoListsReturn {
  deleteTodolistMutation: UseMutationResult<ITodoList, Error, string, unknown>;
}
