import { ButtonPrimaryL } from "@/commons/components/button";
import styles from "./styles.module.css";
import { TextBody02 } from "@/commons/components/text";
import { useFormContext } from "react-hook-form";
import { IZodSchemaTodoListsWrite } from "./types";
import { createTodolist } from "@/server/apis";
import { useUtillDialog } from "@/commons/utills/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  IFetchTodoInfiniteQueryInfo,
  ITodoList,
} from "@/commons/types/todo-list";

// 리스트 등록 & 수정 컴포넌트
export default function TodolistsWrite() {
  const queryClient = useQueryClient();

  const { closeDialog } = useUtillDialog();
  const { register, formState, handleSubmit } =
    useFormContext<IZodSchemaTodoListsWrite>();

  // 등록 가능 여부
  const { isValid } = formState;

  // 등록 함수
  const createTodoList = useMutation({
    mutationKey: ["todo-lists-checked-toggle"],
    mutationFn: (data: IZodSchemaTodoListsWrite) => createTodolist({ data }),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["todo-lists"],
        (oldInfos: IFetchTodoInfiniteQueryInfo) => {
          if (!oldInfos) return { pages: [], pageParams: [] };

          // pages 데이터만 별도 추출
          const pages = JSON.parse(JSON.stringify(oldInfos?.pages));
          const datas: ITodoList[] = pages?.[0]?.data ?? [];

          // 맨 앞에 추가된 리스트 배치
          datas.unshift(data);
          pages[0].data = [...datas];

          return { ...oldInfos, pages };
        },
      );
    },
  });

  // 등록 & 수정 실행
  const writeTodoList = handleSubmit(async (data) => {
    const { title, contents } = data;
    if (!title || !contents) return;

    try {
      // todo-list 새로 등록하기
      createTodoList.mutate(data);

      // 등록 & 수정창 닫기
      closeDialog();
    } catch (err) {
      if (err instanceof Error) throw new Error(err?.message);
    }

    console.log(data);
  });

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={writeTodoList}>
        <div className={styles.write__wrapper}>
          <input
            placeholder="제목 입력"
            className={styles.title}
            {...register("title")}
            id="write-title"
          />
          <textarea
            placeholder="내용 입력"
            className={styles.contents}
            {...register("contents")}
            id="write-contents"
          ></textarea>
        </div>

        <ButtonPrimaryL
          disable={!isValid}
          active={isValid}
          onClick={writeTodoList}
        >
          <TextBody02>등록</TextBody02>
        </ButtonPrimaryL>
      </form>
    </section>
  );
}
