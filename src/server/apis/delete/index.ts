import axios from "axios";

interface IDeleteTodolist {
  id: number;
}

// todo-list 삭제
export const deleteTodolist = async ({ id }: IDeleteTodolist) => {
  const result = await axios.delete(`http://localhost:5010/todoLists/${id}`);
  return result.data;
};
