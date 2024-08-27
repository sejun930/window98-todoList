import axios from "axios";

interface IFetchAllTodoListsProps {
  _page: number;
}

// 전체 목록 조회
export const fetchAllTodoLists = async ({ _page }: IFetchAllTodoListsProps) => {
  console.log(_page);
  const data = await axios.get(`http://localhost:5010/todoLists`, {
    params: {
      _page,
    },
  });

  if (data?.status !== 200) {
    throw new Error("Failed to fetch posts");
  }
  return data.data;
};
