import { ITodoList } from "@/commons/types/todo-list";

export interface ICommonsTodoListsWriteProps {
  isEdit?: boolean; // 수정 모드 여부
  info?: ITodoList;
}
