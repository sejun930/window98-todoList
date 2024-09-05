"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// 개발용 react-query
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

interface ISettingsReactQueryProps {
  children: JSX.Element;
}

// QueryClient 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분 동안 데이터가 'fresh' 상태로 유지됨
      refetchOnWindowFocus: false, // 페이지 포커스 시 데이터 요청 방지
    },
  },
});

// 리액트 쿼리 사용을 위한 설정 컴포넌트
export default function SettingsReactQuery({
  children,
}: ISettingsReactQueryProps): ReactNode {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
