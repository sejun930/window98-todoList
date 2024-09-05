import type { ITodoListsListProps } from "@/components/todo-lists/list/types";

export type ICommonsTodoListsCheckboxProps = Pick<ITodoListsListProps, "uuid"> &
  Pick<ITodoListsListProps["info"], "checked" | "title" | "id"> & {
    isLoading: boolean;
  };

export type IUseCommonsTodoListsCheckboxProps = Pick<
  ICommonsTodoListsCheckboxProps,
  "id" | "checked"
>;
export interface IUseCommonsTodoListsCheckboxReturn {
  toggleChecked: () => void;
}
