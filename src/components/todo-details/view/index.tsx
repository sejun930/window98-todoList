"use client";

import { ITodoList } from "@/commons/types/todo-list";
import { fetchTodoList } from "@/server/apis/todo-lists";
import { HydrationBoundary, useQuery } from "@tanstack/react-query";
import { ITodoDetailViewProps, ITodoDetailProps } from "./types";
import { useEffect } from "react";
import { useUtillDialog } from "@/commons/utills/dialog";
import TodoDetailViewDetail from "./detail";
import Error from "@/components/commons/error";

// 리스트 상세 조회 페이지
export default function TodoDetailView({
  dehydratedState,
  id,
  isEmpty,
}: ITodoDetailViewProps) {
  if (isEmpty) return <Error isShow errorType="404" />;

  return (
    <HydrationBoundary state={dehydratedState}>
      <TodoDetail id={id} dehydratedState={dehydratedState} isEmpty={isEmpty} />
    </HydrationBoundary>
  );
}

const TodoDetail = ({ id, dehydratedState }: ITodoDetailProps) => {
  const { openDialog } = useUtillDialog();

  // 서버에서 조회된 초기 데이터
  const initData =
    (dehydratedState?.queries[0]?.state.data as { data: ITodoList })?.data ??
    {};

  // 상세 데이터 조회
  const { data: info, isLoading } = useQuery({
    queryKey: ["todo-list", { id }],
    queryFn: () => fetchTodoList({ id }),
    initialData: initData,
  });

  useEffect(() => {
    openDialog({
      children: <TodoDetailViewDetail isLoading={isLoading} info={info} />,
      headerInfo: { title: info?.title, action: { href: "/todo-list" } },
    });
  }, [info]);

  return <></>;
};
