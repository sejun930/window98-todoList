import type { ITodoList } from "@/commons/types/todo-list";
import type { IZodSchemaTodoListsWrite } from "@/commons/zod/todo-list.zod";
import type { UseMutationResult } from "@tanstack/react-query";

export interface IUseServerUtillsTodoListsUpdateReturn {
  updateTodolistCheckedMutation: UseMutationResult<
    ITodoList,
    Error,
    {
      id: string;
      checked: boolean;
    },
    unknown
  >;
  updateTodoListMutation: UseMutationResult<
    unknown,
    Error,
    {
      id: string;
      data: IZodSchemaTodoListsWrite;
    },
    unknown
  >;
}
