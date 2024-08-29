import { ITodoList } from "@/commons/types/todo-list";
import axios from "axios";

interface ICreateTodolist {
  data: Pick<ITodoList, "title" | "contents">;
}
type createTodoList = Omit<ITodoList, "id">;

// 리스트 등록
export const createTodolist = async ({ data }: ICreateTodolist) => {
  try {
    const _data: createTodoList = {
      ...data,
      checked: false,
      createdAt: String(new Date()),
      createdAtTime: new Date().getTime(),
    };

    const result = await axios.post(`http://localhost:5010/todoLists2`, _data);
    return result.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
  return {};
};
