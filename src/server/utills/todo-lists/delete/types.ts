import type { ITodoList } from "@/commons/types/todo-list";
import type { UseMutationResult } from "@tanstack/react-query";

export interface IUseServerUtillsTodoListsDeleteReturn {
  deleteTodolistMutation: UseMutationResult<ITodoList, Error, string, unknown>;
}
