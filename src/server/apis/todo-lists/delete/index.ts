import axios from "axios";
import type { IDeleteTodolistProps, IDeleteTodolistReturn } from "./types";
import { INIT_TODO_LIST } from "@/commons/init/todo-list";

// todo-list 삭제
export const deleteTodolist = async ({
  id,
}: IDeleteTodolistProps): Promise<IDeleteTodolistReturn> => {
  try {
    const result = await axios.delete(`http://localhost:5010/todoLists/${id}`);
    return result.data;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
  }
  return INIT_TODO_LIST;
};
