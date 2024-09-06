import type { ITodoList } from "@/commons/types/todo-list";

export interface IUseUpdateTodoListReturn {
  updateTodolistChecked: (
    props: IUpdateTodolistCheckedProps,
  ) => Promise<ITodoList>;
  updateTodolist: (props: IUpdateTodolistProps) => Promise<ITodoList>;
  updateTodolistDeletedAt: (
    props: IUpdateTodolistDeletedAtProps,
  ) => Promise<ITodoList>;
}

// 리스트 체크 정보 변경
export interface IUpdateTodolistCheckedProps {
  id: string;
  checked: boolean;
}
// 리스트 수정
export interface IUpdateTodolistProps {
  id: string;
  data: Pick<ITodoList, "title" | "contents">;
}
// 리스트 삭제
export interface IUpdateTodolistDeletedAtProps {
  id: string;
}
