import axios from "axios";
import type {
  IUpdateTodolistCheckedProps,
  IUpdateTodolistCheckedReturn,
  IUpdateTodolistProps,
  IUpdateTodolistReturn,
} from "./types";
import { INIT_TODO_LIST } from "@/commons/init/todo-list";

// todo-list 체크 정보 변경
export const updateTodolistChecked = async ({
  id,
  checked,
}: IUpdateTodolistCheckedProps): Promise<IUpdateTodolistCheckedReturn> => {
  try {
    const result = await axios.patch(`http://localhost:5010/todoLists/${id}`, {
      checked: !checked,
    });
    return result.data;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
  }

  return INIT_TODO_LIST;
};

// todo-list 수정
export const updateTodolist = async ({
  id,
  data,
}: IUpdateTodolistProps): Promise<IUpdateTodolistReturn> => {
  try {
    const result = await axios.patch(
      `http://localhost:5010/todoLists/${id}`,
      data,
    );
    return result.data;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
  }
  return INIT_TODO_LIST;

  // todo-list 삭제
  // export const updateTodolistDeletedAt = () => {

  // }
};
