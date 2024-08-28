import { UseMutationResult } from "@tanstack/react-query";
import { IZodSchemaTodoListsWrite } from "../types";

export interface ITodolistsWriteCreateReturn {
  createTodoListMutation: UseMutationResult<
    any,
    Error,
    IZodSchemaTodoListsWrite,
    unknown
  >;
}
