import axios from "axios";

interface IUpdateTodolistChecked {
  id: string;
  checked: boolean;
}

// todo-list checked 정보 toggle
export const updateTodolistChecked = async ({
  id,
  checked,
}: IUpdateTodolistChecked) => {
  const result = await axios.patch(`http://localhost:5010/todoLists/${id}`, {
    checked: !checked,
  });
  return result.data;
};
