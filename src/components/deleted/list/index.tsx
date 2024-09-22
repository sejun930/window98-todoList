"use client";

import { MutableRefObject, useRef, type ReactNode } from "react";
import styles from "./styles.module.css";

import { useDeletedList } from "./hook";
import { useDeletedInfos } from "@/commons/zustand/store";

import WithInfiniteScroll from "@/commons/hocs/infinite-scroll";
import Notice from "@/components/commons/notice";
import DeletedListListDetail from "./list-detail";

// 삭제 리스트 노출 컴포넌트
export default function DeletedList(): ReactNode {
  const { hasItems, isLoading, items, fetchMore } = useDeletedList();
  const { deletedInfos } = useDeletedInfos();

  const listRef = useRef() as MutableRefObject<HTMLUListElement>;

  return (
    <section className={styles.section}>
      <WithInfiniteScroll targetRef={listRef} fetchMore={fetchMore}>
        <ul className={styles.list__wrapper} ref={listRef}>
          {/* 로딩 여부 */}
          <Notice isShow={isLoading} text="데이터 조회 중" />
          {/* 데이터 존재 여부 */}
          <Notice
            isShow={!hasItems && !isLoading}
            text="삭제된 리스트가 없습니다."
          />
          {items?.map((info, idx) => {
            const { id, createdAtTime, deletedAtTime } = info;

            const uuid = `delete-list-${id}-${createdAtTime}-${deletedAtTime}`;
            // 마지막 리스트인지 체크
            const isLast = items?.length === idx + 1;

            const isChecked = deletedInfos[id] ?? false;

            return (
              <DeletedListListDetail
                key={uuid}
                uuid={uuid}
                isLast={isLast}
                info={info}
                isLoading={isLoading}
                isChecked={isChecked}
              />
            );
          })}
        </ul>
      </WithInfiniteScroll>
    </section>
  );
}
