import { ITodoList } from "@/commons/types/todo-list";
import { IUseTodoListsListReturn } from "../types";

export type IZodSchemaTodoListsWrite = Pick<ITodoList, "title" | "contents">;

export type ITodoListWriteDialogProps = Pick<
  IUseTodoListsListReturn,
  "openDialog" | "toggleDialog"
>;
