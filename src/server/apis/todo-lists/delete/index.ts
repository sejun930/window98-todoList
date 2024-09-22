import axios from "axios";
import type {
  IDeleteTodolistProps,
  IDeleteTodolistReturn,
  IUseDeleteTodolistReturn,
} from "./types";
import { INIT_TODO_LIST } from "@/commons/init/todo-list";

// 리스트 삭제 관련 Hooks
export const useDeleteTodolist = (): IUseDeleteTodolistReturn => {
  // 리스트 최종 삭제
  const deleteTodolist = async ({
    id,
  }: IDeleteTodolistProps): Promise<IDeleteTodolistReturn> => {
    try {
      const result = await axios.delete(
        `http://localhost:5010/todoLists/${id}`,
      );
      return result.data;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
    return INIT_TODO_LIST;
  };

  return {
    deleteTodolist,
  };
};
