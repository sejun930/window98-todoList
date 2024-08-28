import { useQueryClient } from "@tanstack/react-query";
import { IUseTodolistsWriteUpdateProps } from "./types";

// 수정 관련 hook
export const useTodolistsWriteUpdate = ({
  info,
}: IUseTodolistsWriteUpdateProps) => {
  const queryClient = useQueryClient();

  return {};
};
