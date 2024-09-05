import { type ReactNode, useEffect } from "react";
import type { IInfiniteScrollProps } from "./types";

let movePercent = 0; // 이동한 스크롤 영역
let fetching = false;
let fetchingTimer: ReturnType<typeof setTimeout>;

// 무한 스크롤링 제공 hocs
export default function WithInfiniteScroll({
  children,
  fetchMore,
  disable,
  isFetching = false,
  targetRef,
}: IInfiniteScrollProps): ReactNode {
  // 스크롤 이동 감지 이벤트
  const checkScrollY = (): void => {
    const hasTargetRef = !!targetRef?.current ?? false;

    // 데이터 조회 중에서는 실행하지 않음
    if (fetching) return;

    const BODY = document.body;
    const HTML = document.documentElement;

    // 전체 문서의 높이
    let docHeight = Math.max(
      BODY.scrollHeight,
      BODY.offsetHeight,
      HTML.clientHeight,
      HTML.scrollHeight,
      HTML.offsetHeight,
    );

    // 화면에서 보이는 문서의 높이
    let scrollY = document.documentElement.offsetHeight;
    if ("innerHeight" in window) scrollY = window.innerHeight;

    // 스크롤된 양
    let scrollResult = scrollY + window.pageYOffset;

    if (hasTargetRef) {
      // 지정된 영역이 있다면, 전체가 아닌 해당 영역을 참조
      docHeight =
        (targetRef?.current.scrollHeight ?? 0) -
        (targetRef?.current.clientHeight ?? 0);
      scrollResult = targetRef?.current.scrollTop ?? 0;
    }

    // 전체 크기를 백분율로 표시
    const docHeightPercent = docHeight * 0.01;
    // 이동된 스크롤의 퍼센트율
    movePercent = scrollResult / docHeightPercent;

    // 전체 스크롤에서 80% 이상 내려갔는지 감지
    const isOver = movePercent >= 80; // moreLoadPercent;

    // 스크롤이 페이지 하단에 도달했는지 확인
    if (isOver) {
      // 기존의 fetch 이벤트는 실행 정지
      clearTimeout(fetchingTimer);
      // 새로운 fetch 이벤트는 0.3초 후 실행
      fetchingTimer = setTimeout(() => {
        fetchMore();
      }, 300);
    }
  };

  // 페이지 첫 진입시 감지 이벤트 추가
  useEffect(() => {
    fetching = false;
    const target = targetRef?.current ?? window;

    if (disable) {
      // 정지 상태일 경우 이벤트 종료
      target.removeEventListener("scroll", checkScrollY);
      return;
    }
    // 이벤트 추가
    target.addEventListener("scroll", checkScrollY);

    return () => {
      // 페이지 이탈시 이벤트 제거
      target.removeEventListener("scroll", checkScrollY);
      // 설정된 fetch 이벤트 정지
      clearTimeout(fetchingTimer);
    };
  }, [disable]);

  useEffect(() => {
    fetching = isFetching;
  }, [isFetching, targetRef]);

  return children;
}
