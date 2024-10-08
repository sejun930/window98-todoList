import type {
  IGetIsDifferenceDatasProps,
  IUseUtillsCheckReturn,
} from "./types";

// 값 비교 등의 데이터 검증를 위한 공통 함수
export const useUtillsCheck = (): IUseUtillsCheckReturn => {
  // 모든 값 중에서 다른 점이 있는지를 체크하는 함수
  const getIsDifferenceDatas = ({
    targetIds,
    origin,
  }: IGetIsDifferenceDatasProps): boolean => {
    // 원본과 비교해서 다른 점이 있는지 체크
    let isDifferent = false;

    targetIds.some((id: string) => {
      const value =
        (document.getElementById(id) as HTMLInputElement)?.value ?? "";

      if (value) {
        if (origin[id] !== value) {
          isDifferent = true;
          return true;
        }
      }
      return false;
    });
    return isDifferent;
  };

  return {
    getIsDifferenceDatas,
  };
};
