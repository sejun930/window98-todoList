"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// 개발용 react-query
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

interface ISettingsReactQueryProps {
  children: JSX.Element;
}

// 리액트 쿼리 사용을 위한 설정 컴포넌트
export default function SettingsReactQuery({
  children,
}: ISettingsReactQueryProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
