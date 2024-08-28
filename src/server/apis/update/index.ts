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
  const result = await axios.patch(`http://localhost:5010/todoLists/${id}`, {
    checked: !checked,
  });
  return result.data;
};

//

interface IUpdateTodolist {
  id: string;
  data: Pick<ITodoList, "title" | "contents">;
}
// todo-list 수정
export const updateTodolist = async ({ id, data }: IUpdateTodolist) => {
  const result = await axios.patch(
    `http://localhost:5010/todoLists/${id}`,
    data,
  );
  return result.data;
};
