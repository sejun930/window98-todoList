import { ITodoList } from "@/commons/types/todo-list";
import { IZodSchemaTodoListsWrite } from "@/components/todo-lists/write/types";
import { UseMutationResult } from "@tanstack/react-query";

export interface IUseServerUtillsUpdateReturn {
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
    any,
    Error,
    {
      id: string;
      data: IZodSchemaTodoListsWrite;
    },
    unknown
  >;
}
