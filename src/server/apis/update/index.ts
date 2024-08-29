import { ITodoList } from "@/commons/types/todo-list";
import axios from "axios";

interface IUpdateTodolistChecked {
  id: string;
  checked: boolean;
}
// todo-list 체크 정보 변경
export const updateTodolistChecked = async ({
  id,
  checked,
}: IUpdateTodolistChecked) => {
  try {
    const result = await axios.patch(`http://localhost:5010/todoLists/${id}`, {
      checked: !checked,
    });
    return result.data;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
  }

  return {};
};

//

interface IUpdateTodolist {
  id: string;
  data: Pick<ITodoList, "title" | "contents">;
}
// todo-list 수정
export const updateTodolist = async ({ id, data }: IUpdateTodolist) => {
  try {
    const result = await axios.patch(
      `http://localhost:5010/todoLists/${id}`,
      data,
    );
    return result.data;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
  }
  return {};
};
