import axios from "axios";
import type {
  ICreateTodoList,
  ICreateTodolistProps,
  ICreateTodolistReturn,
} from "./types";
import { INIT_TODO_LIST } from "@/commons/init/todo-list";

// 리스트 등록
export const createTodolist = async ({
  data,
}: ICreateTodolistProps): Promise<ICreateTodolistReturn> => {
  try {
    const _data: ICreateTodoList = {
      ...data,
      checked: false,
      createdAt: String(new Date()),
      createdAtTime: new Date().getTime(),
    };

    const result = await axios.post(`http://localhost:5010/todoLists`, _data);
    return result.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
  return INIT_TODO_LIST;
};
