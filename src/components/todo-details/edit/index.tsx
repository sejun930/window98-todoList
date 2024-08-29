"use client";

import { ITodoList } from "@/commons/types/todo-list";
import styles from "./styles.module.css";
import WithForm from "@/commons/hocs/form";
import {
  IZodSchemaTodoListsWrite,
  zodSchemaTodoListsWrite,
} from "@/commons/zod/todo-list.zod";
import CommonsTodoListsWrite from "@/components/commons/todo-lists/write";
import {
  DehydratedState,
  HydrationBoundary,
  useQuery,
} from "@tanstack/react-query";
import { fetchTodoList } from "@/server/apis/fetch";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { useUtillsCheck } from "@/commons/utills/check";
import { useRouter } from "next/navigation";
import { useUtillDialogAlert } from "@/commons/utills/dialog-alert";

interface ITodoDetailsEditProps {
  dehydratedState: DehydratedState;
  id: string;
}

const TodoDetails = ({ dehydratedState, id }: ITodoDetailsEditProps) => {
  const { setValue } = useFormContext<IZodSchemaTodoListsWrite>();
  const { getIsDifferenceDatas } = useUtillsCheck();
  const { openDialogAlert } = useUtillDialogAlert();
  const router = useRouter();

  // 서버에서 조회된 초기 데이터
  const initData =
    (dehydratedState?.queries[0]?.state.data as { data: ITodoList })?.data ??
    {};

  // 상세 데이터 조회
  const { data } = useQuery({
    queryKey: ["todo-list", { id }],
    queryFn: () => fetchTodoList({ id }),
    initialData: initData,
  });
  const info: ITodoList = data;

  useEffect(() => {
    setValue("title", info.title ?? "");
    setValue("contents", info.contents ?? "");
  }, [info]);

  const onBackEvent = () => {
    // 변경된 사항이 있는지 검증
    const isDifference = getIsDifferenceDatas({
      targetIds: ["title", "contents"],
      origin: { title: info.title, contents: info.contents },
    });
    // 변경된 사항이 없다면, 상세 페이지로 이동
    if (!isDifference) {
      router.replace(`/todo-list/${info.id}`);
      return;
    }

    // 변경된 사항이 있다면 이탈 재확인
    openDialogAlert({
      headerInfo: { title: "수정창 종료" },
      dialogAlertInfo: {
        text: "변경된 내용이 있습니다. 저장하지 않고 종료하시겠습니까?",
        okEvent: () => {
          router.replace(`/todo-list/${info.id}`);
        },
      },
    });
  };

  return (
    <div className={styles.wrapper}>
      <CommonsTodoListsWrite
        isEdit
        useBackEvent={onBackEvent}
        info={info}
        afterMovePath={`/todo-list/${info.id}`}
      />
    </div>
  );
};

// 상세 수정 컴포넌트
export default function TodoDetailsEdit(props: ITodoDetailsEditProps) {
  return (
    <HydrationBoundary state={props?.dehydratedState}>
      <WithForm zodSchema={zodSchemaTodoListsWrite}>
        <TodoDetails {...props} />
      </WithForm>
    </HydrationBoundary>
  );
}
