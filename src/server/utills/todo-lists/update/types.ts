import { ITodoList } from "@/commons/types/todo-list";
import { IZodSchemaTodoListsWrite } from "@/commons/zod/todo-list.zod";
import { UseMutationResult } from "@tanstack/react-query";

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
