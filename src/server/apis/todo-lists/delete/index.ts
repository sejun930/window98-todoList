import axios from "axios";

interface IDeleteTodolist {
  id: string;
}

// todo-list 삭제
export const deleteTodolist = async ({ id }: IDeleteTodolist) => {
  try {
    const result = await axios.delete(`http://localhost:5010/todoLists/${id}`);
    return result.data;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
  }
  return {};
};
