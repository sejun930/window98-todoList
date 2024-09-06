import {
  ITodoListStatus,
  type IFetchTodoInfo,
  type ITodoList,
} from "@/commons/types/todo-list";
import axios from "axios";

interface IFetchAllTodoListsProps {
  _page: number;
}

// 전체 목록 조회
export const fetchAllTodoLists = async ({
  _page,
}: IFetchAllTodoListsProps): Promise<IFetchTodoInfo> => {
  const data = await axios.get(`http://localhost:5010/todoLists`, {
    params: {
      _sort: "-createdAtTime",
      _page,
      deletedAt: "",
      deletedAtTime: 0, // 삭제되지 않았으며
      status: ITodoListStatus.active, // 활성화 되어 있는 경우
    },
  });

  return data.data;
};

interface IfetchTodoListProps {
  id: string;
}
// 리스트 상세 조회
export const fetchTodoList = async ({
  id,
}: IfetchTodoListProps): Promise<ITodoList> => {
  const data = await axios.get(`http://localhost:5010/todoLists/${id}`, {
    params: {
      deletedAt: "",
      deletedAtTime: 0, // 삭제되지 않았으며
      status: ITodoListStatus.active, // 활성화 되어 있는 경우
    },
  });

  return data.data;
};
