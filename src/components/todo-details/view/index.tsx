"use client";

import { HydrationBoundary } from "@tanstack/react-query";
import { type ReactNode, useEffect } from "react";
import { useUtillDialog } from "@/commons/utills/dialog";
import TodoDetailViewDetail from "./detail";
import Error from "@/components/commons/error";
import { useServerUtillsTodoListsFetchTodoListDetail } from "@/server/utills/todo-lists/fetch";

import type { ITodoList } from "@/commons/types/todo-list";
import type { ITodoDetailViewProps, ITodoDetailProps } from "./types";

// 리스트 상세 조회 페이지
export default function TodoDetailView({
  dehydratedState,
  id,
  isEmpty,
}: ITodoDetailViewProps): ReactNode {
  if (isEmpty) return <Error isShow errorType="404" />;

  return (
    <HydrationBoundary state={dehydratedState}>
      <TodoDetail id={id} dehydratedState={dehydratedState} isEmpty={isEmpty} />
    </HydrationBoundary>
  );
}

const TodoDetail = ({ id, dehydratedState }: ITodoDetailProps): ReactNode => {
  const { openDialog } = useUtillDialog();

  // 서버에서 조회된 초기 데이터
  const initData =
    (dehydratedState?.queries[0]?.state.data as { data: ITodoList })?.data ??
    {};

  // 리스트 상세 조회
  const { info, isLoading } = useServerUtillsTodoListsFetchTodoListDetail({
    id,
    initData,
  });

  useEffect(() => {
    openDialog({
      children: <TodoDetailViewDetail isLoading={isLoading} info={info} />,
      headerInfo: { title: info?.title, action: { href: "/todo-list" } },
    });
  }, [info]);

  return <></>;
};
