import type { IURLIds } from "@/commons/types/url";
import { useParams } from "next/navigation";

// params에 관련된 공통 함수
export const useUtillsParams = (): IUseUtillsParamsReturn => {
  const params = useParams();

  // 전체 params id 조회
  const getAllParamsId = (): IURLIds => {
    return {
      todoListId: String(params?.id) ?? "",
    };
  };

  return {
    getAllParamsId,
  };
};

interface IUseUtillsParamsReturn {
  getAllParamsId: () => IURLIds;
}
