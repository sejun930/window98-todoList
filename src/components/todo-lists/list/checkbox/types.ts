import { ITodoListsListProps } from "../types";

export type ITodoListsListCheckboxProps = Pick<ITodoListsListProps, "uuid"> &
  Pick<ITodoListsListProps["info"], "checked" | "title" | "id">;

export type IUseTodoListsListCheckboxProps = Pick<
  ITodoListsListCheckboxProps,
  "id" | "checked"
>;
export interface IUseTodoListsListCheckboxReturn {
  toggleChecked: () => void;
}
