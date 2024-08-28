import { ITodoListsListProps } from "../types";

export type ITodoListsListUpdateProps = Pick<ITodoListsListProps, "info">;

export interface IuseTodoListsListUpdateReturn {
  openUpdateDialog: () => void;
}
