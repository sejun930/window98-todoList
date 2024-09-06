import { ITodoListStatus, type ITodoList } from "../types/todo-list";

// Todo-list 관련 기본값
export const INIT_TODO_LIST: ITodoList = {
  id: "",
  checked: false,
  title: "",
  contents: "",
  createdAt: "",
  createdAtTime: 0,
  deletedAt: "",
  deletedAtTime: 0,
  status: ITodoListStatus.active,
};
